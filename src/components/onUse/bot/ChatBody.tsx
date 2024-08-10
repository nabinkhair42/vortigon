// components/ChatBody.tsx
import React, { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Marked from "@/components/ui/Marked";
import { Bot, User2 } from 'lucide-react';
import LoadingAnimation from '@/components/onUse/bot/loadingAnimation';
interface ChatBodyProps {
    chatHistory: any[];
    loading: boolean;
    chatEndRef: React.RefObject<HTMLDivElement>;
}

const ChatBody: React.FC<ChatBodyProps> = ({ chatHistory, loading, chatEndRef }) => {
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, chatEndRef]);

    return (
        <div className="flex flex-col p-4 h-96 overflow-y-auto">
            <div className="flex-grow">
                {chatHistory.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-4 mb-10 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        {msg.role === 'user' ? (
                            <>
                                <div
                                    className={`inline-block rounded-lg text-sm bg-primary text-white px-4 py-2`}
                                >
                                    {msg.content}
                                </div>
                                <Avatar>
                                    <AvatarImage
                                        src="/"
                                        alt="User Avatar"
                                    />
                                    <AvatarFallback>
                                        <User2 />
                                    </AvatarFallback>
                                </Avatar>
                            </>
                        ) : (
                            <>
                                <Avatar>
                                    <AvatarImage
                                        src="/"
                                        alt="Bot Avatar"
                                    />
                                    <AvatarFallback>
                                        <Bot />
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`inline-block px-2 rounded-lg bg-secondary text-sm`}
                                >
                                    <Marked md={msg.content} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {loading && (
                    <LoadingAnimation />
                )}
                <div ref={chatEndRef} />
            </div>
        </div>
    );
};

export default ChatBody;
