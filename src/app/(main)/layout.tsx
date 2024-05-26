"use client";
import React from "react";
import { SiteFooter } from "@/components/Footer";
import useStore from "@/store";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const user = useStore((state) => state);
  const router = useRouter();

  if (!user?.name) {
    router.push("/name");
  }

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      {children}
      <SiteFooter />
    </div>
  );
};

export default AuthLayout;
