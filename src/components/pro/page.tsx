"use client";
import axios from "axios";
import React, { useState, useRef } from "react";
import useStore from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Send, Trash } from "lucide-react";
import Header from "@/components/Header";
import { GenerativePart, fileToGenerativePart } from "@/lib/imageHelper";

const Home = () => {
  const user = useStore((state) => state);
  const inputRef = useRef<HTMLInputElement>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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

    try {
      setLoading(true);
      const resposne = await axios.post(`/api/gemini`, {
        prompt: prompt,
        image: generativePart,
      });

      console.log(resposne);
    } catch (error) {
      console.log(error);
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
        {imageUrl && (
          <div className="image-area w-full py-4">
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
        <div className="input-area">
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

export default Home;
