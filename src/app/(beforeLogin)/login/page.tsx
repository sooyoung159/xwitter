"use client";

import { useRouter } from "next/navigation";
import Main from "@/app/(beforeLogin)/_component/Main";
import { useSession } from "next-auth/react";
import RedirectToLogin from "@/app/(beforeLogin)/login/_component/RedirectToLogin";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
};

export default Login;
