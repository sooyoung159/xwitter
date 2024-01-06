import style from "./profile.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

interface Props {
  params: { username: string };
}

const Profile = async ({ params }: Props) => {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
};

export default Profile;
