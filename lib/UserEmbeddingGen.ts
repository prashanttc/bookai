  import { prisma } from "@/lib/prisma";
  import {redis} from "@/lib/redis";

  const INTERACTION_WEIGHTS = {
    viewed: 0.3,
    upvoted: 0.5,
    saved: 1.0,
  };

  function parseEmbedding(embeddingStr: string | null | undefined): number[] {
    if (!embeddingStr) return [];
    try {
      return JSON.parse(embeddingStr);
    } catch (error) {
      console.error("❌ Failed to parse embedding:", error);
      return [];
    }
  }

  export async function generateUserEmbedding(userId: string, limit = 20): Promise<number[] | null> {

    const interactions = await prisma.userBookInteraction.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      take: limit,
      select: {
        bookId: true,
        viewed: true,
        upvoted: true,
        saved: true,
      },
    });

    if (interactions.length === 0) return null;

    const bookIds = interactions.map((i:any) => i.bookId);

    const placeholders = bookIds.map((_: any, i: number) => `$${i + 1}`).join(", ");
    const embeddingsData = await prisma.$queryRawUnsafe(
      `SELECT "bookId", "vector"::text FROM "BookEmbedding" WHERE "bookId" IN (${placeholders})`,
      ...bookIds
    ) as { bookId: string; vector: string }[];
      
    const embeddingMap = new Map(
      embeddingsData.map((e) => [e.bookId, parseEmbedding(e.vector)])
    );

    const firstValid = embeddingMap.values().next().value;
    if (!firstValid || firstValid.length === 0) return null;

    const embeddingLength = firstValid.length;
    const userEmbedding = new Array(embeddingLength).fill(0);
    let totalWeight = 0;

    for (const interaction of interactions) {
      const bookEmbedding = embeddingMap.get(interaction.bookId);
      if (!bookEmbedding || bookEmbedding.length !== embeddingLength) continue;

      let interactionWeight = 0;
      if (interaction.viewed) interactionWeight += INTERACTION_WEIGHTS.viewed;
      if (interaction.upvoted) interactionWeight += INTERACTION_WEIGHTS.upvoted;
      if (interaction.saved) interactionWeight += INTERACTION_WEIGHTS.saved;

      if (interactionWeight === 0) continue;

      for (let i = 0; i < embeddingLength; i++) {
        userEmbedding[i] += bookEmbedding[i] * interactionWeight;
      }

      totalWeight += interactionWeight;
    }

    if (totalWeight === 0) return null;

    for (let i = 0; i < embeddingLength; i++) {
      userEmbedding[i] /= totalWeight;
    }

    const vectorLiteral = `[${userEmbedding.join(",")}]`;

    // ✅ Raw SQL upsert into UserEmbedding table
    await prisma.$executeRawUnsafe(`
      INSERT INTO "UserEmbedding" ("userId", "embedding")
      VALUES ($1, $2::vector)
      ON CONFLICT ("userId") DO UPDATE
      SET "embedding" = $2::vector
    `, userId, vectorLiteral);

    // ✅ Save to Redis as JSON string
    await redis.set(`user:embedding:${userId}`, JSON.stringify(userEmbedding));

    console.log("✅ User embedding saved to UserEmbedding table (via raw SQL) and Redis");
    return userEmbedding;
  }
