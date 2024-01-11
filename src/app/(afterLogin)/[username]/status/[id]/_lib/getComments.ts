import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getComments: QueryFunction<
  Post[],
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  console.log(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}/comments`,
    {
      next: {
        tags: ["post", id, "comments"],
      },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
