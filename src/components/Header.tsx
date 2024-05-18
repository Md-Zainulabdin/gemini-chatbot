import { Bot } from "lucide-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-4">
      <Bot className="w-10 h-10" />
      <h2 className="text-5xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-fuchsia-200">Gemini Bot</h2>
    </div>
  );
};

export default Header;
