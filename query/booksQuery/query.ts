import { getBookById } from "@/actions/bookdetails";
import { getDailyFeaturedBooks } from "@/actions/featuredBooks";
import { getRecommendedBooks } from "@/actions/recommandation";
import { searchBooks } from "@/actions/search";
import { getTrendingBooks } from "@/actions/trendingBooks";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "..";
import { generateBookSummary, GenerateSummaryParams } from "@/lib/helpers";
import { getAllBooks } from "@/actions/getAllBooks";

export const useBookSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => searchBooks(query),
    enabled: !!query, // Prevents API call when query is empty
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    retry: 1, // Retries once before failing
  });
};

export const useGetBookById = (bookId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.bookById, bookId],
    queryFn: () => getBookById(bookId),
    enabled: !!bookId,
    retry: 1,
  });
};

export const useGetBookRecommendations = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.bookRecommandations],
    queryFn: () => getRecommendedBooks(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    meta:{
      suspense:true
    }
  });
}
export const useGetBookFeatured = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.bookFeatured],
    queryFn: () => getDailyFeaturedBooks(),
    retry: 1,
    meta:{
      suspense:true
    }
  })
}
export const useGetBookTrendings = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.bookTrendings],
    queryFn: () => getTrendingBooks(),
    retry: 1,
    meta:{
      suspense:true
    }
  })
}
export const useInfiniteBooks = (limit = 20, genre = "All", sort = "Relevance") => {
  return useInfiniteQuery({
    queryKey: ['books-infinite', genre, sort], // This includes genre and sort in the queryKey to refetch when those change
    queryFn: ({ pageParam }: { pageParam?: string }) => 
      getAllBooks({ cursor: pageParam, limit, genre, sort }), // Pass genre and sort along with cursor and limit
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
  });
};
export function useGenerateSummary() {
  return useMutation({
    mutationFn: (params: GenerateSummaryParams) => generateBookSummary(params),
  });
}
