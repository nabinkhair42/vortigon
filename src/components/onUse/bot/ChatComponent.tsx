"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import LoadingAnimation from './loadingAnimation';

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0); // Reset unread count when chat is opened
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message };
    const updatedChatHistory = [...chatHistory, newMessage];
    setChatHistory(updatedChatHistory);
    setMessage("");
    setLoading(true);
    setIsBotTyping(true); // Set bot typing state to true

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: 'clientEngineerElla', message })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const botMessage = { role: 'assistant', content: result.response };

      setChatHistory([...updatedChatHistory, botMessage]);
      setUnreadCount((prevCount) => prevCount + 1);

      localStorage.setItem("chatHistory", JSON.stringify([...updatedChatHistory, botMessage]));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setIsBotTyping(false); // Set bot typing state to false
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      {!isOpen && !isMinimized && (
        <motion.div
          className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary cursor-pointer z-50"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {unreadCount > 0 && !isBotTyping && (
            <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </Badge>
          )}
          {isBotTyping && (
            <div className="absolute -top-2 -right-2">
              <LoadingAnimation />
            </div>
          )}
          <MessageCircle />
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-8 right-5 w-80 border shadow-lg rounded-lg overflow-hidden z-40 bg-background ${isMinimized ? 'h-12' : 'h-fit'}`}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: isMinimized ? 0 : 1, y: isMinimized ? '100%' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader
              setIsOpen={setIsOpen}
              isMinimized={isMinimized}
              setIsMinimized={setIsMinimized}
            />
            {!isMinimized && (
              <>
                <ChatBody chatHistory={chatHistory} loading={loading} chatEndRef={chatEndRef} />
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  handleSend={handleSend}
                  unreadCount={unreadCount}
                />
              </>
            )}
            {/* Loading Indicator */}
            {isMinimized && isBotTyping && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-primary bg-opacity-50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingAnimation />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatComponent;
