import React, { useState, useEffect, useRef } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Chatbot", text: "Welcome! How can I help you today?" },
    {
      sender: "Chatbot",
      text: "Do you have any symptoms or issues you'd like to discuss?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  // Replace 'YOUR_API_KEY' with your actual API key
  const API_KEY = "AIzaSyDjcw583ce2TUTeatDNKC-G8HPxVo-kErg";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generateResponse = async (message) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = await result.response;
      const botResponse = response.text();
      return botResponse;
    } catch (error) {
      console.error("Error fetching response from AI:", error);
      throw new Error("Error occurred while generating.");
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    setIsTyping(true);
    try {
      const botResponse = await generateResponse(newMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: newMessage },
        { sender: "Chatbot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error: ", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: newMessage },
        { sender: "Chatbot", text: "Error occurred while generating." },
      ]);
    } finally {
      setIsTyping(false);
      setNewMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 ${
        !showWidget && "hidden lg:block"
      }`}
    >
      {!showWidget && (
        <button
          className="bg-blue-500 hover:bg-white hover:text-blue-600 hover:animate-bounce text-white font-bold py-2 px-4 rounded-3xl shadow-lg"
          onClick={() => setShowWidget(true)}
        >
          <BiSolidMessageDetail size={34} />
        </button>
      )}
      {showWidget && (
        <div className="rounded-md p-8 shadow-lg  flex-col gap-8 bg-black bg-opacity-60 hidden lg:block">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Welcome to the chatbot box
            </h3>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setShowWidget(false)}
            >
              <HiChevronDoubleDown size={34} />
            </button>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto m-4 p-8 max-h-96 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-black"
          >
            {messages.map((message, index) => (
              <div key={index}>
                <Message sender={message.sender} text={message.text} />
                {isTyping && index === messages.length - 1 && (
                  <TypingIndicator
                    className="text-white text-lg font-semibold inline-block animate-pulse"
                    content="Chatbot is typing..."
                  />
                )}
              </div>
            ))}
          </div>
          <form
            onSubmit={handleMessageSend}
            className="flex items-center gap-4"
          >
            <input
              type="text"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Message = ({ sender, text }) => {
  return (
    <div
      className={`flex flex-col ${
        sender === "You" ? "items-end mt-4" : "items-start"
      }`}
    >
      <span className="text-white">{sender}:</span>
      <div
        className={`${
          sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        } rounded-lg p-3 min-w-5 max-w-xs break-words`}
      >
        {text}
      </div>
    </div>
  );
};

export default Chatbot;
//hedha s7i7
