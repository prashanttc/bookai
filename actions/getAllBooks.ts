"use server";
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getAllBooks({
  cursor,
  limit = 20,
  genre,
  sort,
}: {
  cursor?: string;
  limit?: number;
  genre?: string;
  sort?: string;
}) {
  try {
    const orderBy: Prisma.BookOrderByWithRelationInput =
      sort === 'Rating'
        ? { rating: 'desc' }
        : sort === 'Title'
        ? { title: 'asc' }
        : sort === 'Popularity'?{views:'desc'}
        : { id: 'asc' }; // default sort (Relevance)

    const where: Prisma.BookWhereInput =
      genre && genre !== 'All'
        ? {
            categories: {
              some: {
                name: genre,
              },
            },
          }
        : {};

    const books = await prisma.book.findMany({
      take: limit + 1, // Take one extra to check if more pages exist
      skip: cursor ? 1 : 0, // Skip the first book if there's a cursor
      cursor: cursor ? { id: cursor } : undefined, // Use cursor for pagination
      include: {
        authors: true,
        categories: true,
      },
      orderBy,
      where,
    });

    // Remove duplicate books by using a Set for unique book IDs
    const uniqueBooks = [];
    const seenIds = new Set<string>();

    // Add books to the uniqueBooks array only if their ID is not seen before
    for (const book of books) {
      if (!seenIds.has(book.id)) {
        seenIds.add(book.id);
        uniqueBooks.push(book);
      }
    }

    const hasMore = books.length > limit;
    const paginatedBooks = hasMore ? uniqueBooks.slice(0, -1) : uniqueBooks;

    return {
      books: paginatedBooks,
      nextCursor: hasMore ? books[books.length - 1].id : null,
    };
  } catch (error: any) {
    console.error('Error fetching books with cursor:', error);
    throw new Error(error.message || 'Failed to fetch books');
  }
}
