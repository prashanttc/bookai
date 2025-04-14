"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "../auth";

export async function hasUserUpvoted(bookId: string): Promise<boolean> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated.");
  }

  try {
    const upvote = await prisma.userBookInteraction.findUnique({
      where: {
        userId_bookId: { userId, bookId },
      },
      select: { upvoted: true },
    });
    
    return !!upvote?.upvoted;
  } catch (error) {
    console.error("❌ Error checking user upvote status:", error);
    throw new Error("Failed to check upvote status.");
  }
}
