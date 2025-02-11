"use client";
import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import Image from "next/image"; 
import userIcon from "../public/user-icon.png"; 
import aswinImage from "../public/aswin-image.jpg"; 
import posthog from "posthog-js";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      streamProtocol: "text",
    });
;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackUserMessage(input);

    await handleSubmit(); 
  };

  
  const trackUserMessage = (message: string) => {
    posthog.capture("user_message", {
      message,
      timestamp: new Date().toISOString(),
    });
};

const trackBotResponse = (response: string) => {
  posthog.capture("bot_response", {
    response,
    timestamp: new Date().toISOString(),
  });
};

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.role !== "user") {
        if (!isLoading) {
          trackBotResponse(latestMessage.content);
        }
      }
    }
  },  [messages, isLoading]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute -left-[200px] top-1/2 w-96 h-[50vh] bg-yellow-300 rounded-full blur-[300px] z-10"></div>
      <div className="absolute -right-[200px] bottom-1/2 w-96 h-[50vh] bg-red-400 rounded-full blur-[300px] z-10"></div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl bg-stone-800 shadow-lg rounded-xl md:p-4 p-2 z-50">
        <header className="flex flex-col items-center justify-between md:text-2xl text-sm gap-2 bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg text-center font-bold text-white shadow">
          <div className="flex items-center justify-between  md:gap-6 gap-2 ">
            🤖 Ask Me - AI Agent of Aswin
            <Image
              src={aswinImage}
              alt="Aswin AI"
              width={50}
              height={50}
              className="rounded-full border-2 border-gray-500"
            />
          </div>
          {/* Online Indicator */}
          <div className="flex items-center text-green-400 text-xs md:text-sm font-semibold">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></span>
            Online
          </div>
        </header>

        {/* Chat Messages */}
        <div className="md:h-[70vh] h-[75vh] overflow-y-auto md:p-4 p-2  md:space-y-4 space-y-2 custom-scrollbar">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`flex items-end ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role !== "user" && (
                <Image
                  src={aswinImage}
                  alt="Aswin AI"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-500 mr-2"
                />
              )}
              <div
                className={`relative md:p-4 p-2 max-w-[75%] text-white md:text-base text-sm ${
                  m.role === "user"
                    ? "bg-blue-700 rounded-xl rounded-br-none"
                    : "bg-gray-600 rounded-xl rounded-bl-none"
                }`}
              >
                <p className="mt-1 font-mono">{m.content}</p>
              </div>
              {m.role === "user" && (
                <Image
                  src={userIcon}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-500 ml-2"
                />
              )}
            </div>
          ))}
          {/* AI Typing Indicator (Bouncing Dots Animation) */}
          {isLoading && (
            <div className="flex items-center">
              <Image
                src={aswinImage}
                alt="Aswin AI"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-500 mr-2"
              />
              <div className="p-3 bg-gray-700 text-white rounded-xl rounded-bl-none max-w-[75%]">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleFormSubmit}
          className="p-4 bg-gray-800 flex items-center rounded-lg"
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-l-full bg-gray-700 text-white focus:outline-none font-mono"
          />
          <button
            type="submit"
            className=" px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 self-stretch"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
