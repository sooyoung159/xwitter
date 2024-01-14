"use client";

import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";

interface Props {
  me: Session;
}

const LogoutButton = ({ me }: Props) => {
  // const me = {
  //   // 임시로 내 정보 있는것처럼
  //   id: "zerohch0",
  //   nickname: "제로초",
  //   image: "/5Udwvqim.jpg",
  // };

  // const { data: me } = useSession();
  const router = useRouter();

  const onLogout = () => {
    signOut({ redirect: false });
    router.replace("/");
  };

  if (!me?.user) return null;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user.image!} alt={me.user.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user.name}</div>
        <div>@{me.user.id}</div>
      </div>
    </button>
  );
};
export default LogoutButton;
