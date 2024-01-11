"use client";

import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  me: Session;
}

const LogoutButton = ({ me }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ redirect: false }).then(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "post",
        credentials: "include",
      });
      router.replace("/");
    });
  };

  if (!me?.user) return null;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me?.user.image!} alt={me.user.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user.name}</div>
        <div>@{me.user.id}</div>
      </div>
    </button>
  );
};
export default LogoutButton;
