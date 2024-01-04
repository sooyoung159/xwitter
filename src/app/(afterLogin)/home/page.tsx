import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const getPostRecommends = async () => {
  const res = await fetch("", {
    next: {
      tags: ["posts", "recommends"],
    },
  });

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json();
};
const Home = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["posts", "recommends"] });
  const dehydrateState = dehydrate(queryClient);

  queryClient.getQueryData(["posts", "recommends"]);
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default Home;
