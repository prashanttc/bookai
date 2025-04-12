"use client"

import { useState } from "react"
import { Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/home/book-card"
import type { Book } from "@/types/type"

interface FeaturedBooksSectionProps {
  books: Book[]
  onSave: (id: string) => void
  onPreview: (book: Book) => void
}

export function FeaturedBooksSection({ books, onSave, onPreview }: FeaturedBooksSectionProps) {

  const [showAll, setShowAll] = useState(false)
  const displayBooks = !showAll ? books.slice(0, 10) : books

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Featured Books</h2>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAll(!showAll)}>
          <span>{showAll ? "Show Less" : "View All"}</span>
          <ChevronRight className={`h-4 w-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 transition-all duration-500">
        {displayBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onSave={onSave}
            onPreview={onPreview}
          />
        ))}
      </div>
    </section>
  )
}
