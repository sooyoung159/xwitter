export const getFollowRecommends = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`,
    {
      next: {
        tags: ["users", "followRecommends"],
      },
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
