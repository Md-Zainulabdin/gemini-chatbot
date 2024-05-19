"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Bot } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is required!",
    })
    .max(50),
});

type FormValues = z.infer<typeof formSchema>;

const NamePage = () => {
  const user = useStore((state) => state);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const submitHandler = (values: FormValues) => {
    setLoading(true);

    if (values.name) {
      user.setName(values.name);
      setLoading(false);
      router.push("/");
    } else {
      toast.error("Please fill the required field");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="py-4">
        <Bot className="w-8 h-8" />
      </div>
      <Card className="w-full max-w-[420px] shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome to{" "}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-fuchsia-200">
              Gemini Bot
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitHandler)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Enter Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} className="w-full" type="submit">
                {loading ? "Please Wait ..." : "Next"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default NamePage;

