import { useInfiniteQuery } from '@tanstack/react-query';
export type UseInfiniteScrollProps = {
  key: (string | number | undefined)[];
  limit: number;
  fetchFn: (page: number, limit: number) => Promise<any>;
};

export function useInfiniteScroll({ key, limit, fetchFn }: UseInfiniteScrollProps) {
  const query = useInfiniteQuery({
    queryKey: key,

    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      return await fetchFn(pageParam, limit);
    },

    getNextPageParam: (lastPage, allPages) => {
      // if fewer items than requested were returned,
      // we reached the end

      if (lastPage.items?.length < limit) {
        return undefined;
      }

      return allPages.length;
    },
  });

  return {
    data: query.data?.pages.flatMap(page => page) ?? [],

    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,

    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
}
