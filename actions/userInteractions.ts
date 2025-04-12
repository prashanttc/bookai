/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { generateUserEmbedding } from "@/lib/UserEmbeddingGen";


export async function updateUserInteraction(
  bookId: string,
  type: "viewed" | "saved" | "upvoted"
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  const existing = await prisma.userBookInteraction.findUnique({
    where: {
      userId_bookId: { userId, bookId },
    },
  });

  // Handle upvote logic
  if (type === "upvoted") {
    if (!existing) {
      await prisma.$transaction([
        prisma.userBookInteraction.create({
          data: {
            userId,
            bookId,
            upvoted: true,
          },
        }),
        prisma.book.update({
          where: { id: bookId },
          data: { upvotes: { increment: 1 } },
        }),
      ]);
    } else if (!existing.upvoted) {
      await prisma.$transaction([
        prisma.userBookInteraction.update({
          where: { userId_bookId: { userId, bookId } },
          data: { upvoted: true },
        }),
        prisma.book.update({
          where: { id: bookId },
          data: { upvotes: { increment: 1 } },
        }),
      ]);
    } else {
      await prisma.$transaction([
        prisma.userBookInteraction.update({
          where: { userId_bookId: { userId, bookId } },
          data: { upvoted: false },
        }),
        prisma.book.update({
          where: { id: bookId },
          data: { upvotes: { decrement: 1 } },
        }),
      ]);
    }

  } else {
    // For viewed/saved logic
    if (!existing) {
      await prisma.userBookInteraction.create({
        data: {
          userId,
          bookId,
          viewed: type === "viewed",
          saved: type === "saved",
        },
      });
      await prisma.book.update({
        where: { id: bookId },
        data: { views: { increment: 1 } },
        select:{id:true}
      })
      if (type === "saved") {
        await prisma.savedBook.create({
          data: { userId, bookId },
        });
      }
    } else {
      const updateData: any = {};
      if (type === "viewed") updateData.viewed = true;
      if (type === "saved") updateData.saved = !existing.saved;

      await prisma.userBookInteraction.update({
        where: { userId_bookId: { userId, bookId } },
        data: updateData,
      });

      if (type === "saved") {
        const isNowSaved = !existing.saved;
        if (isNowSaved) {
          await prisma.savedBook.create({
            data: { userId, bookId },
          });
        } else {
          await prisma.savedBook.delete({
            where: {
              userId_bookId: { userId, bookId },
            },
          });
        }
      }
    }
  }

  // ✅ Step: Check total interaction count
  const totalInteractions = await prisma.userBookInteraction.count({
    where: { userId },
  });

  if (totalInteractions % 10 === 0) {
    console.log("📊 Total interactions hit multiple of 10. Generating embedding...");

    await generateUserEmbedding(userId);
  }
}
