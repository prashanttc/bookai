// scripts/generalizeCategories.ts
import { genres } from "@/constants";
import { generateEmbedding } from "@/lib/embeddingGen.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// General categories


// Generate all category embeddings
async function generateCategoryEmbeddings(categories: string[]): Promise<{ [key: string]: number[] }> {
  const embeddings: { [key: string]: number[] } = {};
  for (const category of categories) {
    embeddings[category] = await generateEmbedding(category);
  }
  return embeddings;
}

// Compute cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Match category to closest general category
async function findClosestCategory(category: string, categoryEmbeddings: { [key: string]: number[] }) {
  const categoryEmbedding = await generateEmbedding(category);
  let bestMatch = "Unknown";
  let highestSimilarity = -1;

  for (const [generalCategory, generalEmbedding] of Object.entries(categoryEmbeddings)) {
    const similarity = cosineSimilarity(categoryEmbedding, generalEmbedding);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = generalCategory;
    }
  }
  return bestMatch;
}

// Main function
export default async function generalizeExistingCategories() {
  console.time("Category Generalization Completed In");

  try {
    const categories = await prisma.category.findMany();
    console.log(`📚 Found ${categories.length} categories`);

    if (categories.length === 0) {
      console.log("❌ No categories found in the database.");
      return;
    }

    const categoryEmbeddings = await generateCategoryEmbeddings(genres);

    for (const category of categories) {
      console.log(`🔍 Processing category: ${category.name}`);
      const bestMatch = await findClosestCategory(category.name, categoryEmbeddings);

      if (bestMatch === category.name) {
        console.log(`✅ "${category.name}" already matches "${bestMatch}"`);
        continue;
      }

      const generalizedCategory = await prisma.category.upsert({
        where: { name: bestMatch },
        update: {},
        create: { name: bestMatch },
      });

      await prisma.$executeRaw`
        UPDATE "_BookToCategory" 
        SET "B" = ${generalizedCategory.id} 
        WHERE "B" = ${category.id};
      `;

      const bookCount = await prisma.book.count({
        where: { categories: { some: { id: category.id } } },
      });

      if (bookCount === 0) {
        await prisma.category.delete({ where: { id: category.id } });
        console.log(`🗑️ Removed unused category: ${category.name}`);
      } else {
        console.log(`📌 Retained: ${category.name} (used in ${bookCount} books)`);
      }

      console.log(`🔄 Updated "${category.name}" → "${bestMatch}"`);
    }
  } finally {
    await prisma.$disconnect();
    console.timeEnd("Category Generalization Completed In");
  }
}
