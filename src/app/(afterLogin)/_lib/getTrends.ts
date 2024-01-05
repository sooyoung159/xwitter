export const getTrends = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trends`, {
    next: {
      tags: ["trends"],
    },
  });

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
