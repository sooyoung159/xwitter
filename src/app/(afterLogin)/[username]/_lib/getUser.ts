import { QueryFunction } from "@tanstack/query-core";
import { User } from "@/model/User";

export const getUser: QueryFunction<User, [_1: string, _2: string]> = async ({
  queryKey,
}) => {
  const [_1, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
