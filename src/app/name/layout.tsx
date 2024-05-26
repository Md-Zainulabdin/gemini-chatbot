"use client";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const user = useStore((state) => state);
  const router = useRouter();

  if (user?.name) {
    router.push("/");
  }
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
