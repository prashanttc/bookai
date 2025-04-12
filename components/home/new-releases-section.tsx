"use client"

import { useState } from "react"
import { Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookCard } from "@/components/home/book-card"
import type { Book } from "@/types/type"

interface NewReleasesSectionProps {
  books: Book[]
  likedBooks: string[]
  onLike: (id: string) => void
  onPreview: (book: Book) => void
  onAddToCart: (book: Book) => void
}

export function NewReleasesSection({ books, likedBooks, onLike, onPreview, onAddToCart }: NewReleasesSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const displayBooks = showAll ? books.concat(books.slice(0, 2)) : books

  const fictionBooks = books.filter((book) => book.category === "fiction")
  const nonfictionBooks = books.filter((book) => book.category === "nonfiction")

  // Add isNew flag to all books in this section
  const booksWithNewFlag = displayBooks.map((book) => ({ ...book, isNew: true }))

  return (
    <section className="mb-12">
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">New Releases</h2>
          </div>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fiction">Fiction</TabsTrigger>
            <TabsTrigger value="nonfiction">Non-Fiction</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="mt-0 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-[-60px] right-[0px] gap-1"
            onClick={() => setShowAll(!showAll)}
          >
            <span>{showAll ? "Show Less" : "View All"}</span>
            <ChevronRight className={`h-4 w-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
          </Button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 transition-all duration-500">
            {booksWithNewFlag.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isLiked={likedBooks.includes(book.id)}
                onLike={onLike}
                onPreview={onPreview}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="fiction" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {fictionBooks.map((book) => (
              <BookCard
                key={book.id}
                book={{ ...book, isNew: true }}
                isLiked={likedBooks.includes(book.id)}
                onLike={onLike}
                onPreview={onPreview}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nonfiction" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {nonfictionBooks.map((book) => (
              <BookCard
                key={book.id}
                book={{ ...book, isNew: true }}
                isLiked={likedBooks.includes(book.id)}
                onLike={onLike}
                onPreview={onPreview}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
