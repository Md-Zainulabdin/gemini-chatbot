import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

export const POST = async (req: NextRequest) => {
  const { prompt, image } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  if (image) {
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json(text, { status: 200 });
  }
};
