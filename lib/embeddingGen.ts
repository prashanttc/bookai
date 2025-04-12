/* eslint-disable @typescript-eslint/no-explicit-any */
// embeddingModel.ts

import { pipeline } from "@huggingface/transformers";

const EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2";
let embeddingPipeline: any = null;

// 📌 Initialize pipeline only once
export async function initializeEmbeddingPipeline() {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline("feature-extraction", EMBEDDING_MODEL);
  }
}

// 📌 Generate Embedding from text
export async function generateEmbedding(text: string): Promise<number[]> {
  await initializeEmbeddingPipeline();
  try {
    const output = await embeddingPipeline(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
  } catch (error) {
    console.error("❌ Embedding generation failed:", error);
    throw error;
  }
}
