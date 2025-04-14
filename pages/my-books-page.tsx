"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Clock,
  Star,
  MoreHorizontal,
  PlusCircle,
  CheckCircle2,
  BarChart3,
  Filter,
  Search,
  Calendar,
  BookText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Book } from "@/types/type"

const currentlyReadingBooks = [
  {
    id: 1,
    title: "Harry Potter: Half Blood Prince",
    author: "JK Rowling",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    progress: 65,
    lastRead: "2 hours ago",
    totalPages: 652,
    currentPage: 423,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    progress: 32,
    lastRead: "Yesterday",
    totalPages: 320,
    currentPage: 102,
  },
  {
    id: 5,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.4,
    progress: 12,
    lastRead: "3 days ago",
    totalPages: 448,
    currentPage: 54,
  },
]

const wantToReadBooks = [
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    addedOn: "2 weeks ago",
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.3,
    addedOn: "1 month ago",
  },
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    addedOn: "Just now",
  },
  {
    id: 7,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    addedOn: "3 days ago",
  },
]

const completedBooks = [
  {
    id: 8,
    title: "The Four Winds",
    author: "Kristin Hannah",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    completedOn: "Last week",
    userRating: 5,
  },
  {
    id: 9,
    title: "Educated",
    author: "Tara Westover",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    completedOn: "Last month",
    userRating: 4,
  },
  {
    id: 10,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    completedOn: "2 months ago",
    userRating: 5,
  },
]

// Reading stats
const readingStats = {
  booksRead: 12,
  pagesRead: 3842,
  hoursRead: 64,
  currentStreak: 5,
  longestStreak: 14,
}

export default function MyBooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [showUpdateProgress, setShowUpdateProgress] = useState(false)
  const [newProgress, setNewProgress] = useState(0)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Searching",
      description: `Searching for "${searchQuery}"`,
    })
  }

  const handleUpdateProgress = (book: any) => {
    setSelectedBook(book)
    setNewProgress(book.progress)
    setShowUpdateProgress(true)
  }

  const saveProgress = () => {
    toast({
      title: "Progress updated",
      description: `Updated progress for "${selectedBook?.title}" to ${newProgress}%`,
    })
    setShowUpdateProgress(false)
  }

  const handleBookClick = (id: number) => {
    router.push(`/book-detail?id=${id}`)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Books</h1>
          <p className="text-muted-foreground">Manage your personal reading collection</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your books..."
              className="pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 rounded-full">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Add Book</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a Book</DialogTitle>
                <DialogDescription>
                  Search for a book to add to your collection or enter the details manually.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by title, author, or ISBN" className="pl-8" />
                </div>
                <div className="text-center text-sm text-muted-foreground">or</div>
                <Button variant="outline" className="w-full">
                  Enter Book Details Manually
                </Button>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add to Collection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

    
    </div>
  )
}

// function CurrentlyReadingCard({ book ,onUpdateProgress, onClick }:{book:Book;onUpdateProgress:any;onClick:any}) {
//   return (
//     <Card className="group overflow-hidden transition-all duration-200 hover:shadow-md border-primary/10">
//       <div className="flex p-4 gap-4">
//         <div className="relative w-[70px] h-[105px] shrink-0 cursor-pointer" onClick={onClick}>
//           <div className="relative h-full w-full overflow-hidden rounded">
//             <Image
//               src={book.coverUrl || "/placeholder.svg"}
//               alt={book.title}
//               fill
//               className="object-cover transition-transform duration-300 group-hover:scale-105"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <h3
//             className="text-sm font-medium line-clamp-2 cursor-pointer group-hover:text-primary transition-colors"
//             onClick={onClick}
//           >
//             {book.title}
//           </h3>
//           <p className="text-xs text-muted-foreground mt-0.5">{book.authors.map((auth)=>auth.name)}</p>
//           <div className="mt-2 flex items-center gap-1">
//             <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
//             <span className="text-xs">{book.rating}</span>
//           </div>
//           <div className="mt-auto pt-2">
//             <div className="flex items-center justify-between text-xs mb-1">
//               <span>{book.progress}%</span>
//               <span className="text-muted-foreground">{book.lastRead}</span>
//             </div>
//             <Progress value={book.progress} className="h-1.5" />
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/20">
//         <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
//           Continue Reading
//         </Button>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={onClick}>View Details</DropdownMenuItem>
//             <DropdownMenuItem onClick={onUpdateProgress}>Update Progress</DropdownMenuItem>
//             <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
//             <DropdownMenuItem>Remove from Collection</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </Card>
//   )
// }

// function WantToReadCard({ book, onClick }) {
//   return (
//     <div className="group flex flex-col">
//       <div className="relative mb-3">
//         <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer" onClick={onClick}>
//           <Image
//             src={book.coverImage || "/placeholder.svg"}
//             alt={book.title}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2 h-7 w-7 p-0 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity z-20"
//             >
//               <MoreHorizontal className="h-3.5 w-3.5" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={onClick}>View Details</DropdownMenuItem>
//             <DropdownMenuItem>Start Reading</DropdownMenuItem>
//             <DropdownMenuItem>Remove from Wishlist</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="flex flex-col flex-1">
//         <h3
//           className="text-sm font-medium line-clamp-1 cursor-pointer group-hover:text-primary transition-colors"
//           onClick={onClick}
//         >
//           {book.title}
//         </h3>
//         <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
//         <div className="mt-1.5 flex items-center justify-between">
//           <div className="flex items-center gap-1">
//             <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
//             <span className="text-xs">{book.rating}</span>
//           </div>
//           <span className="text-xs text-muted-foreground">{book.addedOn}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// function CompletedBookCard({ book, onClick }) {
//   return (
//     <div className="group flex flex-col">
//       <div className="relative mb-3">
//         <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer" onClick={onClick}>
//           <Image
//             src={book.coverImage || "/placeholder.svg"}
//             alt={book.title}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
//             <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
//               Completed
//             </Badge>
//           </div>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2 h-7 w-7 p-0 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity z-20"
//             >
//               <MoreHorizontal className="h-3.5 w-3.5" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={onClick}>View Details</DropdownMenuItem>
//             <DropdownMenuItem>Rate Book</DropdownMenuItem>
//             <DropdownMenuItem>Read Again</DropdownMenuItem>
//             <DropdownMenuItem>Remove from Collection</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="flex flex-col flex-1">
//         <h3
//           className="text-sm font-medium line-clamp-1 cursor-pointer group-hover:text-primary transition-colors"
//           onClick={onClick}
//         >
//           {book.title}
//         </h3>
//         <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
//         <div className="mt-1.5 flex items-center justify-between">
//           <div className="flex items-center">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 className={`h-3 w-3 ${
//                   star <= book.userRating ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-muted-foreground">{book.completedOn}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// function EmptyState({ title, description, action }) {
//   return (
//     <div className="text-center py-12">
//       <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
//         <BookOpen className="h-6 w-6 text-muted-foreground" />
//       </div>
//       <h3 className="text-base font-medium mb-2">{title}</h3>
//       <p className="text-sm text-muted-foreground mb-4">{description}</p>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button>
//             <PlusCircle className="h-4 w-4 mr-2" />
//             {action}
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add a Book</DialogTitle>
//             <DialogDescription>
//               Search for a book to add to your collection or enter the details manually.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input placeholder="Search by title, author, or ISBN" className="pl-8" />
//             </div>
//             <div className="text-center text-sm text-muted-foreground">or</div>
//             <Button variant="outline" className="w-full">
//               Enter Book Details Manually
//             </Button>
//           </div>
//           <DialogFooter>
//             <Button variant="outline">Cancel</Button>
//             <Button>Add to Collection</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// {/* <div className="mb-8">
// <h2 className="text-xl font-semibold mb-4">Reading Stats</h2>
// <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//   <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
//     <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//       <BookText className="h-5 w-5 text-primary mb-2" />
//       <p className="text-2xl font-medium">{readingStats.booksRead}</p>
//       <p className="text-xs text-muted-foreground">Books Read</p>
//     </CardContent>
//   </Card>
//   <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
//     <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//       <BarChart3 className="h-5 w-5 text-primary mb-2" />
//       <p className="text-2xl font-medium">{readingStats.pagesRead}</p>
//       <p className="text-xs text-muted-foreground">Pages Read</p>
//     </CardContent>
//   </Card>
//   <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
//     <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//       <Clock className="h-5 w-5 text-primary mb-2" />
//       <p className="text-2xl font-medium">{readingStats.hoursRead}</p>
//       <p className="text-xs text-muted-foreground">Hours Read</p>
//     </CardContent>
//   </Card>
//   <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
//     <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//       <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
//       <p className="text-2xl font-medium">{readingStats.currentStreak}</p>
//       <p className="text-xs text-muted-foreground">Day Streak</p>
//     </CardContent>
//   </Card>
//   <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
//     <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//       <Calendar className="h-5 w-5 text-primary mb-2" />
//       <p className="text-2xl font-medium">{readingStats.longestStreak}</p>
//       <p className="text-xs text-muted-foreground">Longest Streak</p>
//     </CardContent>
//   </Card>
// </div>
// </div>

// <Tabs defaultValue="all" className="mb-8">
// <div className="flex items-center justify-between mb-6">
//   <TabsList className="grid w-full max-w-md grid-cols-4">
//     <TabsTrigger value="all">All</TabsTrigger>
//     <TabsTrigger value="reading">Reading</TabsTrigger>
//     <TabsTrigger value="want">Want to Read</TabsTrigger>
//     <TabsTrigger value="completed">Completed</TabsTrigger>
//   </TabsList>
// </div>

// <TabsContent value="all" className="mt-0 space-y-8">
//   {/* Currently Reading Section */}
//   {currentlyReadingBooks.length > 0 && (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-medium">Currently Reading</h2>
//         <Button variant="ghost" size="sm" className="gap-1 text-xs">
//           View all
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//         {currentlyReadingBooks.map((book) => (
//           <CurrentlyReadingCard
//             key={book.id}
//             book={book}
//             onUpdateProgress={() => handleUpdateProgress(book)}
//             onClick={() => handleBookClick(book.id)}
//           />
//         ))}
//       </div>
//     </div>
//   )}

//   {/* Want to Read Section */}
//   {wantToReadBooks.length > 0 && (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-medium">Want to Read</h2>
//         <Button variant="ghost" size="sm" className="gap-1 text-xs">
//           View all
//         </Button>
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//         {wantToReadBooks.map((book) => (
//           <WantToReadCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
//         ))}
//       </div>
//     </div>
//   )}

//   {/* Completed Books Section */}
//   {completedBooks.length > 0 && (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-medium">Completed</h2>
//         <Button variant="ghost" size="sm" className="gap-1 text-xs">
//           View all
//         </Button>
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//         {completedBooks.map((book) => (
//           <CompletedBookCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
//         ))}
//       </div>
//     </div>
//   )}
// </TabsContent>

// <TabsContent value="reading" className="mt-0">
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//     {currentlyReadingBooks.map((book) => (
//       <CurrentlyReadingCard
//         key={book.id}
//         book={book}
//         onUpdateProgress={() => handleUpdateProgress(book)}
//         onClick={() => handleBookClick(book.id)}
//       />
//     ))}
//   </div>
//   {currentlyReadingBooks.length === 0 && (
//     <EmptyState
//       title="No books in progress"
//       description="Start reading a book to see it here"
//       action="Add a book to start reading"
//     />
//   )}
// </TabsContent>

// <TabsContent value="want" className="mt-0">
//   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//     {wantToReadBooks.map((book) => (
//       <WantToReadCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
//     ))}
//   </div>
//   {wantToReadBooks.length === 0 && (
//     <EmptyState
//       title="Your reading wishlist is empty"
//       description="Add books you want to read in the future"
//       action="Add books to your wishlist"
//     />
//   )}
// </TabsContent>

// <TabsContent value="completed" className="mt-0">
//   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//     {completedBooks.map((book) => (
//       <CompletedBookCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
//     ))}
//   </div>
//   {completedBooks.length === 0 && (
//     <EmptyState
//       title="No completed books yet"
//       description="Books you finish reading will appear here"
//       action="Mark a book as read"
//     />
//   )}
// </TabsContent>
// </Tabs>

// <Dialog open={showUpdateProgress} onOpenChange={setShowUpdateProgress}>
// <DialogContent>
//   <DialogHeader>
//     <DialogTitle>Update Reading Progress</DialogTitle>
//     <DialogDescription>Update your reading progress for "{selectedBook?.title}"</DialogDescription>
//   </DialogHeader>
//   <div className="py-4 space-y-4">
//     <div className="flex items-center justify-between text-sm">
//       <span>
//         Current page: {selectedBook?.currentPage} of {selectedBook?.totalPages}
//       </span>
//       <span>{newProgress}%</span>
//     </div>
//     <div className="px-1">
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={newProgress}
//         onChange={(e) => setNewProgress(Number.parseInt(e.target.value))}
//         className="w-full"
//       />
//     </div>
//     <div className="grid grid-cols-2 gap-4 mt-4">
//       <div>
//         <label className="text-sm font-medium mb-1 block">Current page</label>
//         <Input
//           type="number"
//           value={selectedBook ? Math.round(selectedBook.totalPages * (newProgress / 100)) : 0}
//           onChange={(e) => {
//             const page = Number.parseInt(e.target.value)
//             if (selectedBook && page >= 0 && page <= selectedBook.totalPages) {
//               setNewProgress(Math.round((page / selectedBook.totalPages) * 100))
//             }
//           }}
//         />
//       </div>
//       <div>
//         <label className="text-sm font-medium mb-1 block">Total pages</label>
//         <Input type="number" value={selectedBook?.totalPages || 0} disabled />
//       </div>
//     </div>
//   </div>
//   <DialogFooter>
//     <Button variant="outline" onClick={() => setShowUpdateProgress(false)}>
//       Cancel
//     </Button>
//     <Button onClick={saveProgress}>Save Progress</Button>
//   </DialogFooter>
// </DialogContent>
// </Dialog> */}