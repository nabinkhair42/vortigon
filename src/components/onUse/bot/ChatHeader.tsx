// components/ChatHeader.tsx

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMinimized: boolean;
    setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setIsOpen, isMinimized, setIsMinimized }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold">Vortigon AI Chatbot</div>
            <div className="flex items-center space-x-2">
                {isMinimized ? (
                    <Button
                        className="p-2 rounded-full"
                        onClick={() => setIsMinimized(false)}
                    >
                        <ChevronUp />
                    </Button>
                ) : (
                    <div
                        className="cursor-pointer rounded-full"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChevronDown />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
