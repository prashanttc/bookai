import Image from "next/image"
import {
  BookOpen,
  Search,
  Star,
  MoreHorizontal,
  PlusCircle,
  CheckCircle2,
  BookText,
  BarChart3,
  Home,
  Bookmark,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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

// Sample book data
const currentlyReadingBooks = [
  {
    id: 1,
    title: "Harry Potter: Half Blood Prince",
    author: "JK Rowling",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    progress: 65,
    lastRead: "2 hours ago",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    progress: 32,
    lastRead: "Yesterday",
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
    id: 5,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.4,
    addedOn: "3 days ago",
  },
]

const completedBooks = [
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    completedOn: "Last month",
    userRating: 5,
  },
  {
    id: 7,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    completedOn: "3 months ago",
    userRating: 4,
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
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr] overflow-x-hidden min-h-screen bg-white">
        <AppSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  )
}

function MainContent() {
  return (
    <div className="flex flex-col overflow-x-hidden w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/95 backdrop-blur px-4 md:px-6">
        <SidebarTrigger />
        <div className="flex flex-1 items-center justify-center">
          <form className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your books..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px] rounded-full border-muted"
            />
          </form>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-medium mb-1">My Books</h1>
            <p className="text-sm text-muted-foreground">Manage your personal book collection</p>
          </div>

          {/* Reading Stats */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center justify-center">
              <BookText className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-medium">{readingStats.booksRead}</p>
              <p className="text-xs text-muted-foreground">Books Read</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-medium">{readingStats.pagesRead}</p>
              <p className="text-xs text-muted-foreground">Pages Read</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center justify-center">
              <Search className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-medium">{readingStats.hoursRead}</p>
              <p className="text-xs text-muted-foreground">Hours Read</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-medium">{readingStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center justify-center">
              <Star className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-medium">{readingStats.longestStreak}</p>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </div>
          </div>

          {/* Book Collection Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="want">Want to Read</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1 rounded-full">
                    <PlusCircle className="h-4 w-4" />
                    Add Book
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
            </div>

            <TabsContent value="all" className="mt-0 space-y-8">
              {/* Currently Reading Section */}
              {currentlyReadingBooks.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Currently Reading</h2>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      View all
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentlyReadingBooks.map((book) => (
                      <CurrentlyReadingCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              )}

              {/* Want to Read Section */}
              {wantToReadBooks.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Want to Read</h2>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      View all
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {wantToReadBooks.map((book) => (
                      <WantToReadCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Books Section */}
              {completedBooks.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Completed</h2>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      View all
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {completedBooks.map((book) => (
                      <CompletedBookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reading" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentlyReadingBooks.map((book) => (
                  <CurrentlyReadingCard key={book.id} book={book} />
                ))}
              </div>
              {currentlyReadingBooks.length === 0 && (
                <EmptyState
                  title="No books in progress"
                  description="Start reading a book to see it here"
                  action="Add a book to start reading"
                />
              )}
            </TabsContent>

            <TabsContent value="want" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {wantToReadBooks.map((book) => (
                  <WantToReadCard key={book.id} book={book} />
                ))}
              </div>
              {wantToReadBooks.length === 0 && (
                <EmptyState
                  title="Your reading wishlist is empty"
                  description="Add books you want to read in the future"
                  action="Add books to your wishlist"
                />
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {completedBooks.map((book) => (
                  <CompletedBookCard key={book.id} book={book} />
                ))}
              </div>
              {completedBooks.length === 0 && (
                <EmptyState
                  title="No completed books yet"
                  description="Books you finish reading will appear here"
                  action="Mark a book as read"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function CurrentlyReadingCard({ book }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:shadow-md">
      <div className="flex p-4 gap-4">
        <div className="relative w-[70px] h-[105px] shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded cursor-pointer">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="text-sm font-medium line-clamp-2 cursor-pointer group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs">{book.rating}</span>
          </div>
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>{book.progress}%</span>
              <span className="text-muted-foreground">{book.lastRead}</span>
            </div>
            <Progress value={book.progress} className="h-1.5" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/20">
        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
          Continue Reading
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Progress</DropdownMenuItem>
            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
            <DropdownMenuItem>Remove from Collection</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function WantToReadCard({ book }) {
  return (
    <div className="group flex flex-col">
      <div className="relative mb-3">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-7 w-7 p-0 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Start Reading</DropdownMenuItem>
            <DropdownMenuItem>Remove from Wishlist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-medium line-clamp-1 cursor-pointer group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs">{book.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">{book.addedOn}</span>
        </div>
      </div>
    </div>
  )
}

function CompletedBookCard({ book }) {
  return (
    <div className="group flex flex-col">
      <div className="relative mb-3">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
              Completed
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-7 w-7 p-0 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Rate Book</DropdownMenuItem>
            <DropdownMenuItem>Read Again</DropdownMenuItem>
            <DropdownMenuItem>Remove from Collection</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-medium line-clamp-1 cursor-pointer group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= book.userRating ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{book.completedOn}</span>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        <BookOpen className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            {action}
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
    </div>
  )
}

function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r bg-white">
      <SidebarHeader className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-semibold cursor-pointer">
          <BookOpen className="h-6 w-6" />
          <span>BookVerse</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home">
              <a className="cursor-pointer">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Explore">
              <a className="cursor-pointer">
                <Search className="h-5 w-5" />
                <span>Explore</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="My Books" isActive={true}>
              <a className="cursor-pointer">
                <BookOpen className="h-5 w-5" />
                <span>My Books</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Recent">
              <a className="cursor-pointer">
                <Search className="h-5 w-5" />
                <span>Recent</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookmarks">
              <a className="cursor-pointer">
                <Bookmark className="h-5 w-5" />
                <span>Bookmarks</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <a className="cursor-pointer">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
