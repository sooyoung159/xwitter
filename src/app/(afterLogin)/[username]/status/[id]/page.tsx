import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { User } from "@/model/User";

import { getSinglePostServer } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePostServer";

interface Props {
  params: {
    id: string;
    username: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    openGraph: {
      title: `${user.nickname} (${user.id}) / Z`,
      description: `${user.nickname} (${user.id}) 프로필`,
      images:
        post.Images.length > 0
          ? post.Images.map((v) => ({
              url: `http://localhost:3000${v.link}`,
              width: 400,
              height: 400,
            }))
          : [
              {
                url: `http://localhost:3000${user.image}`,
                width: 400,
                height: 400,
              },
            ],
    },
  };
};

const page = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePostServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default page;
