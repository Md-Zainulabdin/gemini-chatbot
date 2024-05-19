"use client";
import useStore from "@/store";
import React from "react";

const Greeting = () => {
  const { name } = useStore((state) => state);
  return (
    <div className="py-10 space-y-3">
      <h1 className="text-4xl font-semibold tracking-tighter text-muted-foreground">
        Hello{", "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-fuchsia-200">
          {name}
        </span>
      </h1>
      <h2 className="text-4xl font-medium tracking-tighter text-slate-400">
        How can I help you today?
      </h2>
    </div>
  );
};

export default Greeting;
