import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSavedStatus } from '@/actions/getSavedStatus';
import { hasUserUpvoted } from '@/actions/getupvoteStatus';
import { updateUserInteraction } from '@/actions/userInteractions';
import { QUERY_KEYS } from '..';

export function useUpdateInteraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, action }: {bookId: string, action: "viewed" | "saved" | "upvoted" }) =>
      updateUserInteraction( bookId, action),

    onSuccess: () => {
      // Optionally re-fetch queries if needed
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.savedStatus] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userinteraction] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.upvoteStatus] });
    },
  });
}

export function useSavedStatus(bookId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.savedStatus, bookId],
    queryFn: () => getSavedStatus(bookId),
    staleTime: 1000 * 60 * 5, 
  });
}
export function useUpvoteStatus(bookId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.upvoteStatus, bookId],
    queryFn: () => hasUserUpvoted(bookId),
    staleTime: 1000 * 60 * 5, 
  });
}