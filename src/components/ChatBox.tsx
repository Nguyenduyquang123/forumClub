import React, { useState, useRef, useEffect, useCallback } from "react";
import { sendMessage } from "../services/geminiService";

export enum Sender {
  User = "user",
  Gemini = "gemini",
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}
const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat history when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome-gemini",
        text: "Xin chào! Tôi là Gemini, trợ lý AI của bạn. Hãy hỏi tôi bất cứ điều gì!",
        sender: Sender.Gemini,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === "") return;

    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      sender: Sender.User,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const geminiText = await sendMessage(userMessage.text);

      setMessages((prev) => [
        ...prev,
        {
          id: `gemini-${Date.now()}`,
          text: geminiText,
          sender: Sender.Gemini,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to get response: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <h1 className="text-xl font-semibold">Gemini Chat</h1>
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Typing...</span>
          </div>
        )}
      </div>

      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === Sender.User ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md break-words ${
                msg.sender === Sender.User
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm w-full max-w-[75%]">
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <textarea
          className="flex-1 resize-none h-10 min-h-[2.5rem] max-h-32 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
          disabled={isLoading}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
