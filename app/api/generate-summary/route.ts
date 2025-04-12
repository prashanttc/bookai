import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, description, author, bookId } = await request.json();

    // Validate input
    if (!bookId) {
      return NextResponse.json(
        { error: "bookId is required" },
        { status: 400 }
      );
    }
    if (!title && !description) {
      return NextResponse.json(
        { error: "Title or description required" },
        { status: 400 }
      );
    }

    // Check for existing summary
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
      select: { aiSummary: true },
    });

    if (existingBook?.aiSummary) {
      return NextResponse.json({ summary: existingBook.aiSummary });
    }

    // Generate new summary
    const prompt = `Generate a descriptive summary for a book with:
- Title: ${title || "Untitled"}
- Author: ${author || "Unknown"}
- Description: ${description || "No description provided"}
Focus on key themes and appeal to potential readers.`;

    const response = await client.chat.completions.create({
      model: "mistralai/Mistral-Nemo-Instruct-2407",
      messages: [
        {
          role: "system",
          content: "You are a helpful literary assistant that generates engaging book summaries.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500, // 
      temperature: 0.7,
    });

    const summary = response.choices[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    // Save to database
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        aiSummary: summary,
      },
    });

    return NextResponse.json({ summary: updatedBook.aiSummary });

  } catch (error) {
    console.error("Error in generate summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}