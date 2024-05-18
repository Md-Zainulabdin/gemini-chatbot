"use client";
import React, { useRef, useState } from "react";
import useStore from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Send } from "lucide-react";
import Header from "@/components/Header";

const Home = () => {
  const user = useStore((state) => state);
  const inputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleButtonClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="w-full max-w-[700px] border p-4 rounded-md">
        <div>
          <h2>Hello {user?.name}</h2>
        </div>
        <div className="input-area">
          <form className="flex gap-2">
            <Input type="text" placeholder="Enter a prompt here" />
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
            <Button type="submit" variant={"outline"} size={"icon"}>
              <Send className="w-4 h-4 text-muted-foreground" />
            </Button>
          </form>

          {imageUrl && <img src={imageUrl} alt="Selected" />}
        </div>
      </div>
    </>
  );
};

export default Home;
