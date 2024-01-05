"use client";
import { useContext } from "react";
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import FollowingPosts from "@/app/(afterLogin)/home/_component/FollowingPosts";

const TabDecider = () => {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <PostRecommends />;
  } else {
    return <FollowingPosts />;
  }
};

export default TabDecider;
