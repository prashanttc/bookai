"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  Search,
  Star,
  MoreHorizontal,
  Filter,
  Clock,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book } from "@/types/type";
import { useGetSavedBooks, useUpdateInteraction } from "@/query/userQuery/query";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { genres } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  book: Book;
  onRemove: () => void;
  onClick: () => void;
}
export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();
  const { data, isLoading, error, isError } = useGetSavedBooks();
  const{mutate:interaction}=useUpdateInteraction()
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error(error.message);
  }

  const bookmarkedBooks = data || [];
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRemoveBookmark = (book: any) => {
    interaction({bookId:book.id ,action:'saved'})
    toast.success('bookmark removed')
  };


  const handleBookClick = (id: string) => {
    router.push(`/book-detail/${id}`);
  };

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === "All"
      ? bookmarkedBooks
      : bookmarkedBooks.filter((book) =>
          book.categories.some((cat) => cat.name === selectedCategory)
        );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Bookmarks</h1>
          <p className="text-muted-foreground">
            Your saved books for future reference
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-20 hidden md:flex">
        <Tabs defaultValue="All" onValueChange={handleCategoryChange}>
          <TabsList className="mb-4 flex flex-wrap gap-2">
            {genres.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="mb-20 flex md:hidden">
      <Select defaultValue="All" onValueChange={handleCategoryChange}>
  <SelectTrigger className="mb-4 w-[200px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {genres.map((cat) => (
      <SelectItem key={cat} value={cat}>
        {cat}
      </SelectItem>
    ))}
  </SelectContent>
  </Select>
  </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}{" "}
          bookmarked
        </p>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            className="h-8 px-3"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className="h-8 px-3"
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {/* Bookmarks Display */}
      {filteredBooks.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredBooks.map((book) => (
              <BookmarkGridCard
                key={book.id}
                book={book}
                onRemove={() => handleRemoveBookmark(book)}
                onClick={() => handleBookClick(book.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <BookmarkListCard
                key={book.id}
                book={book}
                onRemove={() => handleRemoveBookmark(book)}
                onClick={() => handleBookClick(book.id)}
              />
            ))}
          </div>
        )
      ) : (
        <EmptyState
          title="No bookmarks found"
          description={
            selectedCategory === "All"
              ? "You haven't bookmarked any books yet"
              : `You haven't bookmarked any ${selectedCategory} books yet`
          }
        />
      )}

    </div>
  );
}

function BookmarkGridCard({ book, onRemove, onClick }: Props) {
  return (
    <div className="group flex flex-col">
      <div className="relative mb-3">
        <div
          className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer"
          onClick={onClick}
        >
          <Image
            src={book.coverUrl || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="bg-white/80 text-primary text-[10px] px-1.5 py-0 h-5 flex items-center gap-0.5"
            >
              <Bookmark className="h-3 w-3 fill-primary" />
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
            <DropdownMenuItem onClick={onClick}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove}>
              Remove Bookmark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col flex-1">
        <h3
          className="text-sm font-medium line-clamp-1 cursor-pointer group-hover:text-primary transition-colors"
          onClick={onClick}
        >
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {book.authors.map((uth) => uth.name)}
        </p>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs">{book.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookmarkListCard({ book, onRemove, onClick }: Props) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-primary/10">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div
            className="relative w-[60px] h-[90px] shrink-0 cursor-pointer"
            onClick={onClick}
          >
            <div className="relative h-full w-full overflow-hidden rounded">
              <Image
                src={book.coverUrl || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className="text-sm font-medium line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                  onClick={onClick}
                >
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {book.authors.map((auth) => auth.name)}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onClick}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onRemove}>
                    Remove Bookmark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs">{book.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {book.categories.map((cat) => cat.name)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        <Bookmark className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button>
        <BookOpen className="h-4 w-4 mr-2" />
        Browse Books
      </Button>
    </div>
  );
}
