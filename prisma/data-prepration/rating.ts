/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../lib/prisma.js";
import axios from "axios";
import "dotenv/config";

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_API_KEY;
const CONCURRENCY_LIMIT = 5;

async function fetchGoogleRating(googleBookId: string): Promise<{ rating: number; ratingCount: number } | null> {
  try {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${googleBookId}`, {
      params: { key: GOOGLE_BOOKS_API_KEY },
    });

    const info = res.data.volumeInfo;
    return {
      rating: info.averageRating || 0,
      ratingCount: info.ratingsCount || 0,
    };
  } catch (err) {
    console.warn(`⚠️ Failed to fetch rating for ${googleBookId}`);
    return null;
  }
}

async function updateBookRating(book: { id: string; googleBookId: string }) {
  const ratingInfo = await fetchGoogleRating(book.googleBookId);
  if (!ratingInfo) return;

  await prisma.$executeRaw`
    UPDATE "Book"
    SET rating = ${ratingInfo.rating}, "ratingCount" = ${ratingInfo.ratingCount}
    WHERE id = ${book.id}
  `;
  console.log(`✅ Updated: ${book.googleBookId}`);
}

async function updateAllBookRatings() {
  console.time("📊 Ratings updated in");

  const books = await prisma.book.findMany({
    select: { id: true, googleBookId: true },
  });

  // Batch concurrency
  for (let i = 0; i < books.length; i += CONCURRENCY_LIMIT) {
    const batch = books.slice(i, i + CONCURRENCY_LIMIT);
    await Promise.all(batch.map(updateBookRating));
  }

  console.timeEnd("📊 Ratings updated in");
  await prisma.$disconnect();
}

updateAllBookRatings().catch(console.error);
