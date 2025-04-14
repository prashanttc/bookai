"use server";

import { prisma } from "@/lib/prisma"; // or wherever your Prisma client is

export async function getTrendingBooks(){
  try {
    const trendingBooks = await prisma.book.findMany({
      orderBy: [
        {
          ratingCount: 'desc', // ✅ Fixed here
        },
    
      ],
      include:{
        authors:true,
        categories:true
      },
      take: 10, // optional: limit results
    });

    return trendingBooks;
  } catch (error: any) {
    console.error("Error fetching daily trending books:", error);
    throw new Error(error.message || "Failed to fetch trending books");
  }
}
