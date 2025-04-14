"use client";

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, Star, ThumbsUp, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Book } from "@/types/type"
import Link from "next/link"

interface TrendingSectionProps {
  books: Book[]
}

export function TrendingSection({ books }: TrendingSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const displayBooks = showAll ? books : books.slice(0, 3)
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Trending Now</h2>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAll(!showAll)}>
          <span>{showAll ? "Show Less" : "View All"}</span>
          <ChevronRight className={`h-4 w-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ">
        {displayBooks.map((book) => (
          <Link href={`/book-detail/${book.id}`} 
            key={book.id}
            className="flex cursor-pointer relative gap-4 p-4 rounded-xl border bg-card/50 backdrop-blur transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative w-16 h-24 shrink-0">
              <Image
                src={book.coverUrl || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
              <p className="text-xs text-muted-foreground">{book.authors.map((author)=>author.name)}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${
                        star <= Math.floor(book.rating) ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium">{book.rating}</span>
                <span className="text-xs font-light">({book.ratingCount})</span>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0 h-5 flex items-center gap-0.5 text-green-600 border-green-200 bg-green-50"
                  >
                    <TrendingUp className="h-3 w-15" />
                    {book.views}
                  </Badge>
                
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0 h-5 flex items-center gap-0.5 text-blue-600 border-blue-200 bg-blue-50"
                  >
                    <ThumbsUp className="h-3 w-15" />
                    {book.upvotes}
                  </Badge>
                  </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
