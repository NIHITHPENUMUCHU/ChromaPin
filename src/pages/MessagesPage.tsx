import React, { useState } from 'react';
import { usePinStore } from '../store/usePinStore';
import { MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const MessagesPage: React.FC = () => {
  const { messages, addMessage } = usePinStore();
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const filteredMessages = selectedChat
    ? messages.filter((m) => m.from === selectedChat)
    : [];

  const uniqueChats = Array.from(new Set(messages.map((m) => m.from)));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      addMessage({
        from: 'You',
        content: newMessage.trim(),
        read: true,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No messages yet</p>
        </div>
      ) : (
        <div className="flex gap-6 h-[600px]">
          {/* Chat List */}
          <div className="w-1/3 bg-white rounded-lg shadow-sm p-4">
            {uniqueChats.map((chat) => (
              <motion.button
                key={chat}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 rounded-lg text-left mb-2 transition-colors ${
                  selectedChat === chat ? 'bg-primary text-white' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=50&h=50&fit=crop`}
                    alt={chat}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{chat}</p>
                    <p className="text-sm opacity-80">
                      {messages.find((m) => m.from === chat)?.content.slice(0, 30)}...
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
            {selectedChat ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.from === 'You'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};