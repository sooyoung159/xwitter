"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getFollowRecommends } from "@/app/(afterLogin)/_lib/getFollowRecommends";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";

const FollowRecommendSection = () => {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
  });
  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
};

export default FollowRecommendSection;
