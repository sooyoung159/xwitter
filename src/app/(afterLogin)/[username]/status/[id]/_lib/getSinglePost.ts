import { QueryFunction } from "@tanstack/query-core";
import { Post as IPost } from "@/model/Post";

export const getSinglePost = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
      },
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
