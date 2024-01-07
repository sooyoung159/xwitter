import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import { Suspense } from "react";
import Loading from "@/app/(afterLogin)/home/loading";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
          <div>TEST</div>
        </Suspense>
      </TabProvider>
      <div>tdst</div>
    </main>
  );
};

export default Home;
