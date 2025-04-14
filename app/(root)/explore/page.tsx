"use client";
import { ExploreFilters } from "@/components/ExploreFilter";
import Loading from "@/components/Loading";
import { useBookSearch, useInfiniteBooks } from "@/query/booksQuery/query";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("Relevance");

  const {
    data: res,
    isLoading: searching,
    isError,
    error,
  } = useBookSearch(searchQuery);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteBooks(20,genre,sort);
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const searchResults = res ?? [];
  const observerRef = useRef<HTMLDivElement | null>(null);
  const clearFilters = () => {
    setGenre("All");
    setSort("Relevance");
    setSearchQuery("");
    router.push("/explore");
  };
  if (isLoading || searching) return <Loading />;
  if (isError) {
    return (
      <div className="flex-1 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-medium mb-4">Error</h1>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }
  const clearSearch = () => {
    setSearchQuery(""); // Clear local state
    router.push("/explore"); // Replace URL to remove query param
  };
  const books = data?.pages.flatMap((page) => page.books) ?? [];

  return (
    <div className="flex-1 px-4 md:px-6 py-6">
      {searchQuery ? (
        <div className="max-w-7xl mx-auto mb-4">
          <h1 className="text-2xl font-medium mb-4">Search Results</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {searchResults?.length} results matched for "
              <span className="font-semibold">{searchQuery}</span>"
            </span>
            <button
              onClick={clearSearch}
              className="text-sm text-blue-500 hover:underline"
            >
              Clear Search
            </button>
          </div>
          <div className="grid mt-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {searchResults.map((book) => (
              <Link
                href={`/book-detail/${book.id}`}
                key={book.id}
                className="group flex flex-col"
              >
                <div className="relative mb-3">
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer">
                    <Image
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {book.authors.map((auth) => auth.name).join(", ")}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-4">  <h1 className="text-2xl font-medium ">Explore Books</h1>
          <span className="text-sm text-muted-foreground ">
            explore all books here
          </span></div>
          <ExploreFilters
            selectedGenre={genre}
            selectedSort={sort}
            onGenreChange={setGenre}
            onSortChange={setSort}
            onClear={clearFilters}
          />

          {/* Book Grid */}
          <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {books.map((book) => (
              <Link
                href={`/book-detail/${book.id}`}
                key={book.id}
                className="group flex flex-col"
              >
                <div className="relative mb-3">
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md cursor-pointer">
                    <Image
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {book.authors.map((auth) => auth.name).join(", ")}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
         {/* Infinite Scroll Trigger + Load More fallback */}
<div className="flex flex-col items-center justify-center mt-10">
  <div ref={observerRef} className="h-6 w-full" />
  {isFetchingNextPage && <p className="text-sm text-muted-foreground">Loading more...</p>}

  {hasNextPage && !isFetchingNextPage && (
    <button
      onClick={() => fetchNextPage()}
      className="mt-4 text-sm px-4 py-2 border rounded-md bg-background hover:bg-muted transition"
    >
      Load More
    </button>
  )}

  {!hasNextPage && (
    <p className="text-sm text-muted-foreground mt-4">No more books</p>
  )}
</div>

        </div>
      )}
    </div>
  );
}
