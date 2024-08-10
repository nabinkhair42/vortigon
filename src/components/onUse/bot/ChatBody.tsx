// components/ChatBody.tsx
import React, { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
                        className={`flex items-start gap-2 mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        {msg.role === 'user' ? (
                            <>
                                <div
                                    className={`inline-block p-2 rounded-lg text-sm bg-primary text-secondary`}
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
                                    className={`inline-block p-2 rounded-lg bg-secondary text-sm`}
                                >
                                    {msg.content}
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
