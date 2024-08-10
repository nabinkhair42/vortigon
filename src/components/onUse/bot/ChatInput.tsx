// components/ChatInput.tsx
import React from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { SendIcon } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface ChatInputProps {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    unreadCount: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, handleSend, unreadCount }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="relative flex items-center p-4 border-t">
            <Input
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 mr-2"
            />
            <Button 
                onClick={handleSend} 
                className="flex items-center transition-transform transform hover:scale-105 active:scale-95"
            >
                <SendIcon />
            </Button>
            {/* {unreadCount > 0 && (
                <Badge className="absolute top-0 right-0">
                    {unreadCount}
                </Badge>
            )} */}
        </div>
    );
};

export default ChatInput;
