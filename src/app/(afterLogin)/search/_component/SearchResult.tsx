"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";

interface Props {
  searchParams: { q: string; f?: string; pf?: string };
}

const SearchResult = ({ searchParams }: Props) => {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
  });

  return data?.map((post) => {
    return <Post key={post.postId} post={post} />;
  });
};

export default SearchResult;
