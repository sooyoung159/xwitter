import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { auth } from "@/auth";
import { Metadata } from "next";

interface Props {
  params: { username: string };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const user = await getUserServer({ queryKey: ["users", params.username] });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
};

const Profile = async ({ params }: Props) => {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
};

export default Profile;
