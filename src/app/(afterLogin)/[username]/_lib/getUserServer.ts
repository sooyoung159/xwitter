import { QueryFunction } from "@tanstack/query-core";
import { User } from "@/model/User";
import { cookies } from "next/headers";

export const getUserServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },
      credentials: "include",
      headers: { Cookie: cookies().toString() },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
