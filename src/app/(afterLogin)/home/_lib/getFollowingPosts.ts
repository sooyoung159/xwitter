export const getFollowingPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings`,
    {
      next: {
        tags: ["posts", "followings"],
      },
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
