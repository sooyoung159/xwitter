import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";

interface Props {
  username: string;
}

const UserPosts = ({ username }: Props) => {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["post", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  if (user) {
    return data?.map((post) => {
      return <Post post={post} key={post.postId} />;
    });
  }
};

export default UserPosts;
