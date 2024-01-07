export const getTrends = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`,
    {
      next: {
        tags: ["trends"],
      },
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
