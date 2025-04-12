"use client";

import Image from "next/image";
import {
  Eye,
  Star,
  EyeIcon,
  BookmarkCheck,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Book } from "@/types/type";
import { Author } from "@/types/type";
import Link from "next/link";
import { useSavedStatus } from "@/query/userQuery/query";
import { useRouter } from "next/navigation";

interface BookCardProps {
  book: Book;
  onSave: (id: string) => void;
  onPreview: (book: Book) => void;
}

export function BookCard({ book, onSave, onPreview }: BookCardProps) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/book-detail/${book.id}`);
  };
  const { data: isSaved, isLoading } = useSavedStatus(book.id);

  return (
    <Card onClick={handleCardClick} className="group h-full overflow-hidden bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

        <div className="relative">
          <div
            className="relative aspect-[2/3] w-full overflow-hidden cursor-pointer"
         
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <Image
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full gap-1"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent link click
                  onPreview(book);
                }}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Quick View</span>
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-7 w-7 p-0 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-background"
            onClick={(e) => {
              e.stopPropagation(); // Prevent link click
              onSave(book.id);
            }}
          >
            {isSaved ? (
              <BookmarkCheck className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Like</span>
          </Button>
        </div>

        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-1 cursor-pointer group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate w-full">
            {book.authors.map((author: Author) => author.name).join(", ")}
          </p>
          <div className="mt-1.5 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    book.rating && star <= Math.floor(book.rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : book.rating && star <= book.rating
                      ? "fill-yellow-500/50 text-yellow-500/50"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium ml-1">
              {book.rating}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-0 flex justify-between items-center">
          <Button size="lg" className="rounded-full px-2.5 h-7 text-xs gap-1">
            {book.previewLink ? (
              <Link
                href={book.previewLink}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1"
              >
                <EyeIcon className="h-3 w-3" />
                <span>preview</span>
              </Link>
            ) : (
              <>
                <EyeIcon className="h-3 w-3" />
                <span>preview</span>
              </>
            )}
          </Button>
        </CardFooter>

    </Card>
  );
}
