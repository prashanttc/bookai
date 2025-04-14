"use server";

import { prisma } from "@/lib/prisma";

export async function getBookById(bookId: string) {
  try {
    if (!bookId) {
      throw new Error("bookid required");
    }
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select:{
        id:true,
        title:true,
        categories:true,
        aiQuestions:true,
        aiSummary:true,
        aiThemes:true,
        authors:true,
        coverUrl:true,
        pageCount:true,
        previewLink:true,
        publisher:true,
        publishDate:true,
        description:true,
      }
    });

    if (!book) throw new Error("Book not found");

    return book;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}
