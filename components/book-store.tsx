"use client"

import { useState } from "react"
import { Search, ShoppingCart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useSidebar } from "@/components/ui/sidebar"
import BookCard from "@/components/book-card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Book } from "@/type"

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.5,
    coverImage: "/placeholder.svg?height=300&width=200",
    price: "$14.99",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    coverImage: "/placeholder.svg?height=300&width=200",
    price: "$16.99",
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.3,
    coverImage: "/placeholder.svg?height=300&width=200",
    price: "$12.99",
  },
  {
    id: 4,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    rating: 4.7,
    coverImage: "/placeholder.svg?height=300&width=200",
    price: "$15.99",
  },
  {
    id: 5,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    rating: 4.4,
    coverImage: "/placeholder.svg?height=300&width=200",
    price: "$13.99",
  },
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.9,
    coverImage: "/placeholder.svg?height=300&width=200",
    price: "$17.99",
  },
]

export default function BookStore() {
  const [cartCount, setCartCount] = useState(0)
  const { state } = useSidebar()
  const router = useRouter()

  const handleAddToCart = () => {
    setCartCount(cartCount + 1)
    toast({
      title: "Added to cart",
      description: "This book has been added to your cart",
    })
  }

  return (
    <>
      <div className="flex items-center justify-center flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for books..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] rounded-full border-muted"
          />
        </div>
      </div>
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {cartCount}
          </span>
        )}
      </Button>

      <div className="p-4 md:p-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Welcome to BookVerse</h1>
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Trending Books</h2>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/explore")}>
              <span>View all</span>
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
          <BookCarousel books={books}  />
        </section>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">New Releases</h2>
            <Button variant="ghost" size="sm" onClick={() => router.push("/explore")}>
              View all
            </Button>
          </div>
          <BookCarousel books={books.slice().reverse()} />
        </section>
      </div>
    </>
  )
}

function BookCarousel({ books }:{books:any}) {
  const router = useRouter()

  const handleBookClick = (id:string) => {
    router.push(`/book-detail?id=${id}`)
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {books.map((book:any) => (
          <CarouselItem key={book.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <BookCard book={book}  />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-2 mt-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  )
}
