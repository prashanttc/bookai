"use server";

import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { auth } from "../auth";

export async function getRecommendedBooks(limit = 10) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const redisKey = `user:embedding:${userId}`;
  let userEmbedding: number[] | null = null;

  // 1. Try to get user embedding from Redis
  const cached = (await redis.get(redisKey)) ;

  if (cached) {
    userEmbedding = cached as number[];
  }
  
  // 2. Fallback: Fetch from DB if not in Redis
  if (!userEmbedding) {
    const dbResult = await prisma.$queryRawUnsafe<Array<{ embedding: string }>>(
      `SELECT embedding::text FROM "UserEmbedding" WHERE "userId" = $1`,
      userId
    );

    const embeddingStr = dbResult?.[0]?.embedding;
    if (!embeddingStr){
      return [];
    };

    try {
      userEmbedding = JSON.parse(embeddingStr);
    } catch (err) {
      console.error("❌ DB embedding parse error:", err);
      throw new Error("Failed to parse user embedding.");
    }
  }

  if (!userEmbedding || !Array.isArray(userEmbedding)) {
    throw new Error("Invalid user embedding.");
  }

  // 3. Construct vector literal
  const vectorLiteral = `[${userEmbedding.join(",")}]`;

  // 4. Query similar books via pgvector
  const similarBooks = await prisma.$queryRawUnsafe<
    Array<{ bookId: string; similarity: number }>
  >(
    `
    SELECT "bookId", 1 - ("vector" <#> $1::vector) AS similarity
    FROM "BookEmbedding"
    ORDER BY "vector" <#> $1::vector
    LIMIT $2
    `,
    vectorLiteral,
    limit
  );

  const bookIds = similarBooks.map((b) => b.bookId);

  // 5. Fetch actual book details
  const books = await prisma.book.findMany({
    where: { id: { in: bookIds } },
    include: {
      authors: true,
      categories: true,
    },
  });

  // 6. Preserve similarity order
  const bookMap = new Map(books.map((book) => [book.id, book]));
  return bookIds
  .map((id) => bookMap.get(id))
  .filter((book): book is typeof books[number] => Boolean(book));
}
