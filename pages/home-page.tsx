"use client";

import type React from "react";

import { useState } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { TrendingSection } from "@/components/home/trending-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { RecommendationsSection } from "@/components/home/recommendations-section";
import { FeaturedBooksSection } from "@/components/home/featured-books-section";
import { BookPreviewDialog } from "@/components/home/book-preview-dialog";
import type { Book } from "@/types/type";
import {
  useGetBookFeatured,
  useGetBookRecommendations,
  useGetBookTrendings,
} from "@/query/booksQuery/query";
import { categories, heroSlides } from "@/constants";
import { TrendingSectionSkeleton } from "@/components/skeletons/trending-section-skeleton";
import { RecommendationsSectionSkeleton } from "@/components/skeletons/recommendations-section-skeleton";
import { FeaturedBooksSectionSkeleton } from "@/components/skeletons/featured-books-section-skeleton";
import { useUpdateInteraction } from "@/query/userQuery/query";

export default function HomePage() {
  const { data: featuredBooks, isLoading: featuredBookLoading } =
    useGetBookFeatured();
  const { data: trendingBooks, isLoading: trendingBookLoading } =
    useGetBookTrendings();
  const { data: recommandationBook, isLoading: recommandationBookLoading } =
    useGetBookRecommendations();
  const { mutate: updateInteraction } = useUpdateInteraction();
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  
  const [savedBooks, setSavedBooks] = useState<string[]>([]);

  const toggleSave = (bookId: string) => {
    const isSaved = savedBooks.includes(bookId);
    // Optimistic UI update
    setSavedBooks((prev) =>
      isSaved ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );

    // Trigger server mutation
    updateInteraction({ bookId, action: "saved" });
    console.log(updateInteraction)
  };

  return (
    <>
      <HeroSection slides={heroSlides} />

      <div className="px-6 md:px-8 lg:px-10 py-8 max-w-7xl mx-auto">
        {trendingBookLoading || !trendingBooks ? (
          <TrendingSectionSkeleton />
        ) : (
          <TrendingSection books={trendingBooks} />
        )}

        {recommandationBookLoading || !recommandationBook ? (
          <RecommendationsSectionSkeleton />
        ) : (
          <RecommendationsSection
            books={recommandationBook!}
            onPreview={setPreviewBook}
          />
        )}

        {featuredBookLoading || !featuredBooks ? (
          <FeaturedBooksSectionSkeleton />
        ) : (
          <FeaturedBooksSection
            books={featuredBooks}
            onSave={toggleSave}
            onPreview={setPreviewBook}
          />
        )}

        <CategoriesSection categories={categories} />
      </div>

      <BookPreviewDialog
        book={previewBook}
        isSaved={previewBook ? savedBooks.includes(previewBook.id) : false}
        onClose={() => setPreviewBook(null)}
        onSave={toggleSave}
      />
    </>
  );
}
