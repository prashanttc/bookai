"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Download,
  Share2,
  Bookmark,
  BookmarkIcon,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useGenerateSummary, useGetBookById } from "@/query/booksQuery/query";
import Loading from "@/components/Loading";
import { useSavedStatus, useUpdateInteraction } from "@/query/userQuery/query";
import { toast } from "sonner";

export default function BookDetailPage({ bookId }: { bookId: string }) {
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);

  const { data: bookData, isLoading } = useGetBookById(bookId);
  const { mutate: userinteraction, isPending } = useUpdateInteraction();
  const { data: isBookmarked } = useSavedStatus(bookId);
  const { mutate: generateSummary, isPending: ailoading } =
    useGenerateSummary();

  useEffect(() => {
    userinteraction({
      bookId: bookId,
      action: "viewed",
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (!bookData) {
    return <div>Book not found</div>;
  }

  const handleGenerateSummary = () => {
    generateSummary(
      {
        bookId,
        title: bookData.title,
        description: bookData.description,
        author: bookData.authors.map((auth) => auth.name).join(", "),
      },
      {
        onSuccess: (summary) => {
          setSummaryText(summary);
          toast.success("summary generated successfully");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
    setShowSummary(true);
  };

  const handleBookmark = () => {
    userinteraction({
      bookId: bookId,
      action: "saved",
    });
  };
  const handleShare = () => {
    setIsSharing(true);
    setShowShareDialog(true);

    // Simulate API call
    setTimeout(() => {
      setIsSharing(false);
    }, 500);
  };

  const handleDownload = () => {
    setIsDownloading(true);

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  const handleStartReading = () => {
    setReadingStarted(true);

    // Simulate opening reader
    setTimeout(() => {
      setReadingStarted(false);
    }, 1000);
  };

  return (
    <>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_2fr]">
            <div className="flex items-center justify-center">
              <div className="relative aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={bookData.coverUrl || "/placeholder.svg"}
                  alt={bookData.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isBookmarked && (
                  <div className="absolute top-3 right-3 z-20">
                    <BookmarkIcon className="h-6 w-6 fill-primary text-primary drop-shadow-md" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {bookData.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {bookData.authors.map((auth) => auth.name).join(", ")}
              </p>
              <p className="text-muted-foreground line-clamp-3 mt-4">
                {bookData.description?.slice(0, 150)}
                {bookData.description?.length > 150 ? "..." : ""}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  className="gap-2 rounded-full px-6"
                  onClick={handleStartReading}
                  disabled={readingStarted}
                >
                  {readingStarted ? "Opening..." : "Start reading"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleGenerateSummary}
                  variant="secondary"
                  className="gap-2 rounded-full px-6"
                  disabled={ailoading}
                >
                  <Bot className="h-4 w-4" />
                  {ailoading ? "Generating..." : "AI Summary"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleBookmark}
                >
                  {isBookmarked ? (
                    <BookmarkIcon className="h-4 w-4 fill-primary text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleShare}
                  disabled={isSharing}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {showSummary && (
                <Card className="mt-6 bg-secondary/50 border-secondary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      AI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {ailoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[95%]" />
                        <Skeleton className="h-4 w-[85%]" />
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{summaryText}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Separator className="my-10" />

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Description</h2>
              <div className="space-y-4 text-muted-foreground">
                {bookData.description}
              </div>
              {/* 
              <div className="mt-8 flex gap-4 rounded-lg border p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={bookData.reviewer.avatar}
                    alt={bookData.reviewer.name}
                  />
                  <AvatarFallback>
                    {bookData.reviewer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{bookData.reviewer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {bookData.reviewer.quote}
                  </p>
                </div>
              </div> */}
            </div>

            <div className="w-full flex items-center justify-evenly">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Publisher</h2>
                <p className="text-muted-foreground">{bookData.publisher}</p>

                <h2 className="mb-4 mt-8 text-xl font-semibold">category</h2>
                <p className="text-muted-foreground">
                  {bookData.categories.map((cat) => cat.name)}
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-xl font-semibold">page count</h2>
                <p className="text-muted-foreground">{bookData.pageCount}</p>

                <h2 className="mb-4 mt-8 text-xl font-semibold">
                  publish date
                </h2>
                <p className="text-muted-foreground">{bookData.publishDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share "{bookData.title}"</DialogTitle>
            <DialogDescription>
              Share this book with friends and family through various platforms.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg
                className="h-5 w-5 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
              </svg>
              <span className="text-xs">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg
                className="h-5 w-5 text-[#1DA1F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
              </svg>
              <span className="text-xs">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg
                className="h-5 w-5 text-[#25D366]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg
                className="h-5 w-5 text-[#0A66C2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-xs">LinkedIn</span>
            </Button>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Or copy link</p>
            <div className="flex gap-2">
              <Input
                value={`https://bookverse.com/books/${bookId}`}
                readOnly
                className="flex-1"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://bookverse.com/books/${bookId}`
                  );
                }}
              >
                <Check className="h-4 w-4 mr-2" /> Copy
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowShareDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
