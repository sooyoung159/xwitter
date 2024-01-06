import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getComments: QueryFunction<
  Post[],
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  const [_1, _2, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/posts/${id}/comments`,
    {
      next: {
        tags: ["post", id, "comments"],
      },
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
