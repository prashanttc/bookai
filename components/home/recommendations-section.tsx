"use client";

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Bot, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Book } from "@/types/type"

interface RecommendationsSectionProps {
  books: Book[]
  onPreview: (book: Book) => void
}

export function RecommendationsSection({ books, onPreview }: RecommendationsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const displayBooks = showAll ? books : books.slice(0, 5)

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">AI-Powered Recommendations</h2>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAll(!showAll)}>
          <span>{showAll ? "Show Less" : "View All"}</span>
          <ChevronRight className={`h-4 w-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
        </Button>
      </div>
      <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-secondary flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary absolute" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
            </div>
            <h3 className="text-xl font-medium">Personalized For You</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Based on your reading history and preferences, our AI recommends these books just for you.
          </p>
          <Button className="gap-2 group">
            <span> Recommendations</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="md:w-2/3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-all duration-500">
          {displayBooks.map((book) => (
            <div key={book.id} className="flex flex-col items-center cursor-pointer group">
              <div className="relative w-16 h-24 md:w-20 md:h-30 mb-2 shadow-md rounded overflow-hidden">
                <Image
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40"
                    onClick={() => onPreview(book)}
                  >
                    <Eye className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
              <p className="text-xs font-medium text-center line-clamp-1 group-hover:text-primary transition-colors">
                {book.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
