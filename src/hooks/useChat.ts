import { useState, useEffect } from "react";

export interface ChatMessage {
  type: "user" | "ai";
  text: string;
}

export default function useChat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Generate or reset userId
  const generateUserId = () =>
    `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  useEffect(() => {
    setUserId(generateUserId());
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    // Add user message
    setChatHistory((prev) => [...prev, { type: "user", text }]);
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, userId }),
      });
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const data = await response.json();
      if (data.response) {
        setChatHistory((prev) => [
          ...prev,
          { type: "ai", text: data.response },
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("Nastala chyba pri komunikácii s AI asistentom.");
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setChatHistory([]);
    setError("");
    setUserId(generateUserId());
  };

  return { chatHistory, loading, error, sendMessage, resetChat };
}
