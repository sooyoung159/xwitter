import { QueryFunction } from "@tanstack/query-core";
import { Post as IPost } from "@/model/Post";

export const getSinglePost: QueryFunction<
  IPost,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
      },
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
