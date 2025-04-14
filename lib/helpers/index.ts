'use client'
export type GenerateSummaryParams = {
    bookId: string;
    title?: string;
    description?: string;
    author?: string;
  };
  
  export async function generateBookSummary(params: GenerateSummaryParams) {
    const response = await fetch("/api/generate-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Failed to generate summary");
    }
  
    const data = await response.json();
    return data.summary as string;
  }
  