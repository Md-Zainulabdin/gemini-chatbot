"use client";
import axios from "axios";
import { Send } from "lucide-react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Greeting from "@/components/greeting/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Chat {
  message: string;
  user: boolean;
  bot?: string;
}

const Basic = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setChatHistory((prev) => [
      ...prev,
      { message: prompt, user: true, bot: "" },
    ]);

    try {
      setLoading(true);
      const resposne = await axios.post(`/api/gemini`, {
        prompt: prompt,
      });

      if (resposne.status == 200) {
        setChatHistory((prev) => [
          ...prev,
          { message: resposne.data, user: false, bot: "Gemini" },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <>
      <div className="w-full max-w-[700px] h-[700px] grid grid-rows-[90%_10%] gap-6 border p-4 rounded-md mt-6">
        {chatHistory.length == 0 ? (
          <div className="greeting-area">
            <Greeting />
          </div>
        ) : (
          <div className="chat-area overflow-y-scroll scrollbar-thumb-gray-700 scrollbar-track-gray-100 p-3 text-start space-y-8">
            {chatHistory.map((chat, index) => (
              <div key={index} className="w-full flex items-start gap-3">
                <Avatar className="flex items-center justify-center">
                  {chat.user ? (
                    <AvatarFallback>CN</AvatarFallback>
                  ) : (
                    <AvatarImage className="w-6 h-6" src="/gemini.svg" />
                  )}
                </Avatar>
                <div className="p-2">{chat.message}</div>
              </div>
            ))}

            {loading && (
              <div className="w-full flex flex-row gap-3">
                <Avatar className="flex items-center justify-center">
                  <AvatarImage className="w-6 h-6" src="/gemini.svg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full space-y-3">
                  <Skeleton className="w-full h-[14px] rounded-full" />
                  <Skeleton className="w-full h-[14px] rounded-full" />
                  <Skeleton className="w-[50%] h-[14px] rounded-full" />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="input-area ">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrompt(event.target.value);
              }}
              placeholder="Enter a prompt here"
            />
            <Button
              disabled={loading || !prompt}
              type="submit"
              variant={"outline"}
              size={"icon"}
            >
              <Send className="w-4 h-4 text-muted-foreground" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Basic;
