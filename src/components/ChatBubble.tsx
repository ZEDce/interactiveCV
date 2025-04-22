import React from "react";

interface ChatBubbleProps {
  message: { type: "user" | "ai"; text: string };
}

const ChatBubble: React.FC<ChatBubbleProps> = React.memo(({ message }) => {
  const lines = message.text.split("\n");
  const isUser = message.type === "user";
  return (
    <div
      className={`p-3 rounded-xl max-w-[80%] message-fade-in ${
        isUser
          ? "bg-orange-100 ml-auto text-right"
          : "bg-white border border-gray-200 mr-auto text-left"
      }`}
    >
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i !== lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
});

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
