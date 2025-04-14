"use server";
import { prisma } from "@/lib/prisma";
import { generateEmbedding } from "@/lib/embeddingGen";
import { Book } from "@/types/type";

export async function searchBooks(text: string): Promise<Book[]> {
  try {
    if (!text) {
      throw new Error("Query text is required");
    }

    const userEmbedding = await generateEmbedding(text);

    // First, fetch the top book IDs by similarity using raw SQL
    const similarBooks = await prisma.$queryRaw<{ id: string }[]>`
      SELECT 
        b.id
      FROM "Book" b
      JOIN "BookEmbedding" e ON b.id = e."bookId"
      ORDER BY (1 - (e.vector <=> ${JSON.stringify(userEmbedding)}::vector)) DESC
      LIMIT 10;
    `;

    const bookIds = similarBooks.map((b) => b.id);

    // Now fetch full book data including authors using Prisma ORM
    const books = await prisma.book.findMany({
      where: {
        id: { in: bookIds },
      },
      include: {
        authors: true,
        categories:true
      },
    });

    return books;
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Failed to fetch books");
  }
}
