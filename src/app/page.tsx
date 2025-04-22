"use client";
import React, { useState, useRef } from "react";
// import Chatbot from "@/components/Chatbot";
import CvModal from "../components/CvModal";
import { FileText } from "lucide-react";
import { parseCvMarkdown, CvData } from "../lib/cvParser";
import { cvMarkdownContent } from "../lib/cvContent";
import ChatBubble from "../components/ChatBubble";
import Header from "../components/Header";
import WhyMe from "../components/WhyMe";
import QuickActions from "../components/QuickActions";
import useChat from "../hooks/useChat";
import useAutoScroll from "../hooks/useAutoScroll";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const { chatHistory, loading, error, sendMessage, resetChat } = useChat();

  // Parse the CV data
  const cvData: CvData = parseCvMarkdown(cvMarkdownContent);

  // Ref for scrolling chat history
  const historyContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat history when it updates
  useAutoScroll(historyContainerRef, [chatHistory]);

  return (
    <div className="min-h-screen bg-[url('/mobilebacgkground.png')] md:bg-[url('/orange-background.jpg')] bg-cover bg-center md:bg-center lg:bg-fixed flex flex-col items-center justify-center p-4 relative">
      <button
        onClick={() => setIsCvModalOpen(true)}
        className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out flex items-center space-x-2"
        aria-label="Zobraziť životopis"
      >
        <FileText size={20} />
        <span>CV</span>
      </button>

      {/* Conditionally render the CvModal */}
      {isCvModalOpen && cvData && (
        <CvModal
          isOpen={isCvModalOpen}
          onClose={() => setIsCvModalOpen(false)}
          cvData={cvData}
        />
      )}

      <div className="w-full sm:w-2/3 max-w-3xl rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 bg-orange-50/75">
        <div className="px-2 sm:px-0">
          <Header />
        </div>
        <WhyMe />

        {/* Chat interaction section */}
        <div className="rounded-lg p-6 shadow-inner border border-gray-100 bg-white/30">
          {/* Refined Chat History Display */}
          <div
            ref={historyContainerRef}
            className="mb-4 max-h-72 overflow-y-auto space-y-2 p-3"
          >
            {chatHistory.map((message, idx) => (
              <ChatBubble message={message} key={idx} />
            ))}
            {/* Typing indicator */}
            {loading && (
              <div className="p-3 rounded-xl max-w-[80%] bg-white border border-gray-200 mr-auto text-left inline-block">
                {" "}
                {/* Mimic AI bubble style */}
                <div className="flex space-x-1 items-center h-5">
                  {" "}
                  {/* Fixed height for alignment */}
                  <span className="typing-dot"></span>
                  <span className="typing-dot animation-delay-150ms"></span>{" "}
                  {/* Use ms for clarity */}
                  <span className="typing-dot animation-delay-300ms"></span>
                </div>
              </div>
            )}
          </div>

          <QuickActions
            onSend={sendMessage}
            onReset={resetChat}
            loading={loading}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(query);
              setQuery("");
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Napíšte svoju otázku..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg border border-transparent transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Odosielam..." : "Odoslať"}
            </button>
          </form>

          {error && !loading && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 text-gray-800 whitespace-pre-wrap">
              {error}
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          Kontakt: <a href="mailto:adambartko159@gmail.com" className="underline hover:text-orange-600">adambartko159@gmail.com</a> | <a href="https://www.linkedin.com/in/adam-bartko-274a6327b/" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">LinkedIn</a>
          <br />
          Vytvorené s Next.js, TypeScript a ❤️ pre AI.
        </div>
      </div>
    </div>
  );
}
