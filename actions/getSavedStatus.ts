'use server'
import { prisma } from "@/lib/prisma";
import { auth } from "../auth";

export async function getSavedStatus(bookId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    };

    const saved = await prisma.savedBook.findFirst({
      where: {
        userId: session.user.id,
        bookId,
      },
    });

    return !!saved;
  } catch (error) {
    console.error("❌ getSavedStatus error:", error);
    return false;
  }
}
