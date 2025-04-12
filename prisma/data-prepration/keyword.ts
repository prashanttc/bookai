import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
// import { HfInference } from "@huggingface/inference";
import natural from "natural";

dotenv.config();

const prisma = new PrismaClient();
// const hf = new HfInference(process.env.HF_API_TOKEN);

async function generateThemesAndKeywords(description: string) {
  try {
    if (!description) return { aiThemes: [], keywords: [] };

    // // 1️⃣ Extract themes using Hugging Face zero-shot classification
    // const themeResponse = await hf.zeroShotClassification({
    //     model: "facebook/bart-large-mnli",
    //     inputs: description,
    //     parameters: {
    //       candidate_labels: [
    //         "Adventure",
    //         "Romance",
    //         "Fantasy",
    //         "Mystery",
    //         "Science Fiction",
    //         "Horror",
    //         "Biography",
    //         "History",
    //         "Thriller",
    //         "Self-help",
    //       ],
    //     },
    //   });
      
    //   // Check the structure of the response
    //   console.log("🎯 Theme Response:", themeResponse);
      
    //   // Extract labels properly
    //   const aiThemes = themeResponse.labels ? themeResponse.labels.slice(0, 3) : [];
      

    // 2️⃣ Extract keywords using TF-IDF (Natural)
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(description);

    const keywords: string[] = [];
    tfidf.listTerms(0).slice(0, 5).forEach(item => {
      keywords.push(item.term);
    });

    return { keywords };
  } catch (error) {
    console.error("Error generating AI themes/keywords:", error);
    return { keywords: [] };
  }
}

async function updateBooksWithAI() {
  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { keywords: { equals: [] } },
        ],
      },
      select: {
        id: true,
        description: true,
      },
    });

    for (const book of books) {
      if (!book.description) continue;

      console.log(`Processing book ID: ${book.id}...`);

      const { keywords } = await generateThemesAndKeywords(book.description);

      await prisma.book.update({
        where: { id: book.id },
        data: {  keywords },
      });

      console.log(`✅ Updated book ID: ${book.id}`);
    }

    console.log("🎉 All books processed!");
  } catch (error) {
    console.error("Error updating books:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBooksWithAI();
