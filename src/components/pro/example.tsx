"use client";
import axios from "axios";
import { Image, Send, Trash } from "lucide-react";
import React, { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Greeting from "@/components/greeting/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { formatMessage } from "@/lib/formatMessage";
import { GenerativePart, fileToGenerativePart } from "@/lib/imageHelper";

interface Chat {
  message: string;
  user: boolean;
  bot?: string;
  image?: string;
}

const Pro = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generativePart, setGenerativePart] = useState<GenerativePart | null>(
    null
  );

  const handleButtonClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      try {
        const part = await fileToGenerativePart(file);
        setGenerativePart(part);
        console.log("Generative part:", part);
      } catch (error) {
        console.error("Error generating part:", error);
      }
    }
  };

  const handleImageDelete = () => {
    setImageUrl(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setChatHistory((prev) => [
      ...prev,
      { message: prompt, user: true, bot: "", image: imageUrl || "" },
    ]);

    try {
      setLoading(true);
      const resposne = await axios.post(`/api/gemini-vision`, {
        prompt: prompt ? prompt : "Image without any prompt",
        image: generativePart,
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
      setImageUrl("");
      setGenerativePart(null);
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
                <div className="p-2">
                  {chat.image && (
                    <div className="relative border mb-2 rounded-md w-[150px] h-[150px] p-2 overflow-hidden">
                      <img
                        src={chat.image || ""}
                        alt="image"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div>{formatMessage(chat.message)}</div>
                </div>
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
        <div className="input-area relative">
          {imageUrl && (
            <div className="image-area absolute bottom-16 py-4">
              <div className="relative border rounded-md w-[120px] h-[120px] p-2 overflow-hidden">
                <span className="absolute top-1 right-1">
                  <Trash
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => handleImageDelete()}
                  />
                </span>
                <img
                  src={imageUrl || ""}
                  alt="image"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          )}
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrompt(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              placeholder="Enter a prompt here"
            />
            <Input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button
              onClick={handleButtonClick}
              variant={"outline"}
              size={"icon"}
            >
              <Image className="w-4 h-4 text-muted-foreground" />
            </Button>
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

export default Pro;
