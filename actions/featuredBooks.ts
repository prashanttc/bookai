'use server';

import seedrandom from "seedrandom";
import { prisma } from "@/lib/prisma";
import {redis} from "@/lib/redis";
import { Book } from "@/types/type";

// Fisher-Yates Shuffle
function shuffleArray<T>(array: T[], rng: () => number): T[] {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export async function getDailyFeaturedBooks() {
  const todayKey = `featured_books:${new Date().toISOString().slice(0, 10)}`;

  try {
    // 1. Try Redis Cache First
    const cached = (await redis.get(todayKey)) ;
    if (cached) {
      return cached as Book[];
    }
    
    // 2. Fetch all book IDs
    const allBooks = await prisma.book.findMany({
      select: { id: true },
    });

    const ids = allBooks.map(b => b.id);
    const uniqueIds = Array.from(new Set(ids));

    // 3. Shuffle with seed
    const seed = new Date().toISOString().slice(0, 10);
    const rng = seedrandom(seed);
    const shuffledIds = shuffleArray(uniqueIds, rng).slice(0, 20);

    // 4. Fetch the actual books by ID
    const featuredBooks = await prisma.book.findMany({
      where: { id: { in: shuffledIds } },
      include: {
        authors: true,
        categories: true,
      },
    });

    // Optional: de-duplicate by ID if Prisma ever returns dups (unlikely)
    const uniqueBooks = Array.from(
      new Map(featuredBooks.map(book => [book.id, book])).values()
    );
    // 5. Cache in Redis for 24 hours
    await redis.set(todayKey,JSON.stringify(uniqueBooks), {
      ex: 60 * 60 * 24,
    });

    return uniqueBooks;
  } catch (error: any) {
    console.error("Error fetching daily featured books:", error);
    throw new Error(error.message || "Failed to fetch featured books");
  }
}
