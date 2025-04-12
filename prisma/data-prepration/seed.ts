/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import "dotenv/config";
import generalizeExistingCategories from "./category.js";
import { generateEmbedding } from "@/lib/embeddingGen.js";

const prisma = new PrismaClient();
const MAX_RETRIES = 3;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // Ensure you have this in .env

interface GoogleBook {
  id: string;
  title: string;
  authors?: string[];
  publisher?: string;
  description?: string;
  categories?: string[];
  pageCount?: number;
  publishedDate?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  previewLink?: string;
  rating?: number; // Add rating if available
  ratingCount?: number; // Add ratings count if available
}

/**
 * Fetch books from Google Books API with pagination.
 */
async function fetchBooksByQuery(query: string, totalBooks: number): Promise<GoogleBook[]> {
  const books: GoogleBook[] = [];
  let startIndex = 0;
  const maxResults = 40; // Google Books API limit per request

  while (books.length < totalBooks) {
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: query,
          maxResults,
          startIndex,
          key: GOOGLE_BOOKS_API_KEY,
        },
      });

      const fetchedBooks = response.data.items?.map((item: any) => {
        const info = item.volumeInfo;
        return {
          id: item.id,
          title: info.title,
          authors: info.authors || [],
          publisher: info.publisher || "Unknown",
          description: info.description || null,
          categories: info.categories || [],
          pageCount: info.pageCount || null,
          publishedDate: info.publishedDate || null,
          imageLinks: info.imageLinks || {},
          previewLink: info.previewLink || null,
          rating:info.averageRating || 0, // Add rating if available,
          ratingCount:info.ratingsCount || 0, // Add ratings count if available
        };
      }) || [];

      books.push(...fetchedBooks);
      startIndex += maxResults; // Move to next page

      if (fetchedBooks.length < maxResults) break; // Stop if API returns fewer results

    } catch (error) {
      console.error(`❌ Error fetching books for "${query}" at startIndex ${startIndex}:`, error);
      break;
    }
  }

  return books.slice(0, totalBooks); // Ensure exact count
}

/**
 * Fetch 5000 books efficiently.
 */
async function fetchGoogleBooks(totalRequired: number): Promise<GoogleBook[]> {
  const queries = [
 "animated"
  ];
    const booksPerQuery = Math.ceil(totalRequired / queries.length);
  const allBooks: GoogleBook[] = [];

  for (const query of queries) {
    console.log(`📚 Fetching ${booksPerQuery} books for query: "${query}"`);
    const books = await fetchBooksByQuery(query, booksPerQuery);
    allBooks.push(...books);
    if (allBooks.length >= totalRequired) break; // Stop if total required books are fetched
  }

  return allBooks.slice(0, totalRequired);
}

async function seedBook(book: GoogleBook) {
  if (!book.title) {
    console.warn("⚠️ Skipping book with missing title");
    return;
  }

  const description = book.description;
  const coverUrl = book.imageLinks?.thumbnail || null;

  // **Skip books with missing description or cover URL**
  if (!description || !coverUrl) {
    console.warn(`⏭️ Skipping book "${book.title}" due to missing description or cover URL.`);
    return;
  }

  const categories = book.categories || [];
  const embeddingText = `${book.title} ${description} ${categories.join(", ")} `;
  const googleBookId = book.id;
  const publishDate = book.publishedDate || null;
  const publisher = book.publisher || "Unknown";
  const pageCount = book.pageCount || 0; // Store page count
  const rating = book.rating||0;
  const ratingCount = book.ratingCount||0; // Store ratings count

  let embedding: number[] = [];
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      embedding = await generateEmbedding(embeddingText.slice(0, 512));
      break;
    } catch (error) {
      if (attempt === MAX_RETRIES) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  const bookData = {
    title: book.title,
    description,
    coverUrl,
    googleBookId,
    previewLink: book.previewLink || null,
    publishDate,
    publisher,
    pageCount, // Store page count
    aiSummary: null,
    aiQuestions: [],
    aiThemes: [],
    rating,
    ratingCount,
    views: 0,
    upvotes: 0,
    authors: {
      connectOrCreate: book.authors?.map((author: string) => ({
        where: { name: author },
        create: { name: author },
      })) || [],
    },
    categories: categories.length
      ? {
          connectOrCreate: categories.map((category: string) => ({
            where: { name: category },
            create: { name: category },
          })),
        }
      : undefined,
  };

  const newBook = await prisma.book.create({
    data: bookData,
    select: { id: true },
  });

  await prisma.$queryRaw`
  INSERT INTO "BookEmbedding" ("bookId", "vector")
  VALUES (${newBook.id}, ${JSON.stringify(embedding)}::vector)
`;

  console.log(`✅ Processed: ${book.title} (Published: ${publishDate || "Unknown"} by ${publisher}, ${pageCount} pages)`);
}

async function main() {
  console.time("Seeding completed in");
  try {
    const books = await fetchGoogleBooks(1000);
    console.log(`🚀 Starting seed for ${books.length} books`);

    for (const [index, book] of books.entries()) {
      console.log(`📖 Processing book ${index + 1}/${books.length}`);
      await seedBook(book).catch((error) =>
        console.error(`❌ Failed to process book ${index + 1}:`, error)
      );
    }
    console.log("🧠 Running category generalization...");
    await generalizeExistingCategories(); 
  } finally {
    await prisma.$disconnect();
    console.timeEnd("Seeding completed in");
  }
}

main().catch(console.error);
