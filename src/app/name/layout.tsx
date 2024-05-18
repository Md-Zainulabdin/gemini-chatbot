import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="w-full h-[100vh] flex flex-col text-center justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
