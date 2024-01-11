import { QueryFunction } from "@tanstack/query-core";
import { Post as IPost } from "@/model/Post";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({
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
      headers: { Cookie: cookies().toString() },
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
