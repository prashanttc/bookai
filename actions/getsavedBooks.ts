'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getSavedBooks() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Get saved book IDs for the user
    const books = await prisma.savedBook.findMany({
      where: { userId },
      select: { bookId: true },
    });

    const bookIds = books.map((book) => book.bookId);

    if (bookIds.length === 0) return [];

    // Fetch full book details for the saved book IDs
    const bookmarkedBooks = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
      include:{
        categories:true,
        authors:true
      }
    });

    return bookmarkedBooks;
  } catch (error: any) {
    console.error("Error fetching saved books:", error);
    throw new Error(error.message || "Failed to fetch saved books");
  }
}
