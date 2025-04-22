"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiRefreshCw } from "react-icons/fi"; // Import reset icon
// import Image from 'next/image'; // REMOVED Image import
import styles from "./Chatbot.module.css"; // Import CSS module

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  apiUrl: string; // Now expects the N8N Webhook URL
}

const predefinedQuestions = [
  "Aké máš projekty?",
  "Popíš pracovné skúsenosti.",
  "Aké máš vzdelanie?",
  "Technické Zručnosti",
  "Kontaktuj ma",
];

const Chatbot: React.FC<ChatbotProps> = ({ apiUrl }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>(""); // Add state for Conversation ID
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Generate initial Conversation ID on component mount
  useEffect(() => {
    setConversationId(crypto.randomUUID());
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Core function to send message and handle response
  const sendMessageToWebhook = async (messageText: string) => {
    if (!apiUrl) {
      setError("Chyba: URL adresa pre webhook nie je nakonfigurovaná.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Prepáčte, nie je možné odoslať správu, chýba konfigurácia.",
        },
      ]);
      return;
    }
    if (!messageText) return; // Don't send empty messages
    if (!conversationId) {
      setError("Chyba: ID konverzácie nebolo vygenerované.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Prepáčte, interná chyba (chýba ID konverzácie).",
        },
      ]);
      return;
    } // Add check for conversationId

    setIsLoading(true);
    setError(null);

    try {
      // Send POST request including conversationId
      const response = await axios.post<{ reply?: string }>(apiUrl, {
        message: messageText,
        conversationId: conversationId, // Include conversation ID
      });

      // Expecting { "reply": "..." } in the webhook response
      const botReply = response.data?.reply;

      if (botReply) {
        const botResponse: Message = { sender: "bot", text: botReply };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } else {
        // Handle case where webhook response doesn't contain 'reply'
        console.warn(
          "Webhook response did not contain a 'reply' field:",
          response.data
        );
        const fallbackResponse: Message = {
          sender: "bot",
          text: "Odpoveď z webhooku nemala očakávaný formát.",
        };
        setMessages((prevMessages) => [...prevMessages, fallbackResponse]);
      }
    } catch (err) {
      console.error("Chyba pri komunikácii s n8n webhookom:", err);
      let errorMessage =
        "Ospravedlňujem sa, nastala chyba pri spojení s AI asistentom.";
      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorMessage = `API vrátil chybu: ${err.response.status}. Skúste to prosím neskôr.`;
        } else if (err.request) {
          errorMessage =
            "AI asistent neodpovedá. Je webhook spustený a dostupný?";
        }
      }
      setError(errorMessage);
      const errorResponse: Message = {
        sender: "bot",
        text: "Prepáčte, momentálne mám technický problém a nemôžem odpovedať.",
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for sending user-typed message
  const handleSendTypedMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const newUserMessage: Message = { sender: "user", text: trimmedInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue("");

    await sendMessageToWebhook(trimmedInput); // Call core send function
  };

  // Handler for clicking predefined question
  const handlePredefinedQuestionClick = async (question: string) => {
    if (isLoading) return; // Don't allow clicking while loading

    const newUserMessage: Message = { sender: "user", text: question };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    await sendMessageToWebhook(question); // Call core send function
  };

  // Function to reset the chat AND generate a new Conversation ID
  const handleResetChat = () => {
    setMessages([]);
    setError(null);
    setConversationId(crypto.randomUUID()); // Generate new ID on reset
    // Optional: Reset input field as well?
    // setInputValue('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendTypedMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Add Reset Button */}
      <button
        className={styles.resetButton}
        onClick={handleResetChat}
        disabled={isLoading || messages.length === 0} // Disable if loading or no messages
        title="Resetovať chat" // Tooltip
      >
        <FiRefreshCw /> {/* Icon */}
      </button>

      <h3 className={styles.chatbotTitle}>
        Vyberte si tému alebo napíšte vlastnú otázku:
      </h3>
      <div className={styles.chatbotMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.user : styles.bot
            }`}
          >
            <span className={styles.messageBubble}>{msg.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.bot}`}>
            <span
              className={`${styles.messageBubble} ${styles.typingIndicator}`}
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
        {error && !isLoading && (
          <div className={`${styles.message} ${styles.bot} ${styles.error}`}>
            <span className={styles.messageBubble}>{error}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Predefined Questions Area */}
      <div className={styles.predefinedQuestionsContainer}>
        {predefinedQuestions.map((q, index) => (
          <button
            key={index}
            className={styles.predefinedQuestionButton}
            onClick={() => handlePredefinedQuestionClick(q)}
            disabled={isLoading}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area remains */}
      <div className={styles.chatbotInputArea}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Napíšte svoju otázku..."
          disabled={isLoading}
          className={styles.chatbotInput}
        />
        <button
          onClick={handleSendTypedMessage} // Changed handler
          disabled={isLoading || !inputValue.trim()}
          className={styles.chatbotButton}
        >
          {isLoading ? "Odosielam..." : "Odoslať"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
