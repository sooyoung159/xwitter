"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectToLogin = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/i/flow/login");
  }, []);
  return null;
};

export default RedirectToLogin;
