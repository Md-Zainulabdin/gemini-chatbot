import React from "react";
import { Bot } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Basic from "@/components/basic/page";
import Pro from "@/components/pro/example";

const Home = () => {
  return (
    <div>
      <div className="pro-tab flex flex-col gap-4 items-center justify-center">
        <div>
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <Tabs defaultValue="basic" className="text-center w-[700px]">
            <TabsList>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="pro">Pro</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <Basic />
            </TabsContent>
            <TabsContent value="pro">
              <Pro />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
