import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy as style } from "react-syntax-highlighter/dist/esm/styles/prism";

export const formatMessage = (message: string) => {
  return message.split("\n\n").map((section: string, index) => {
    const isHeading = section.startsWith("**");
    const isCode = section.startsWith("```");

    if (isCode) {
      const code = section.replace(/```/g, "");
      return (
        <SyntaxHighlighter key={index} language="javascript" style={style}>
          {code}
        </SyntaxHighlighter>
      );
    }
    if (isHeading) {
      const heading = section.replace(/\*\*/g, "");
      return (
        <h2 key={index} className="font-semibold text-[17px] mt-4 mb-2">
          {heading}
        </h2>
      );
    } else {
      const content = section.split("\n").map((line, i) => {
        if (line.startsWith("* ")) {
          return (
            <li key={i} className="ml-4 list-disc">
              {line.replace("* ", "")}
            </li>
          );
        } else {
          return (
            <p key={i} className="mb-2">
              {line}
            </p>
          );
        }
      });
      return <div key={index}>{content}</div>;
    }
  });
};
