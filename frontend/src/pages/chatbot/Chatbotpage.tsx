import React, { useEffect, useRef, useState } from 'react';
import { FaRegComments, FaArrowUp } from 'react-icons/fa';

interface Conversation {
  id: number;
  title: string;
  content: string;
}

interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    { id: 1, title: 'Yesterday', content: 'Yesterday\'s conversation content...' },
    { id: 2, title: 'Last Week', content: 'Last week\'s conversation content...' },
  ]);

  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: chatHistory.length + 1,
        text: message,
        timestamp: new Date(),
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex h-screen font-poppins" role="main">
      <aside className="hidden md:block md:w-1/4 lg:w-1/5 bg-green-300 border-r border-gray-300 p-4" style={{ backgroundColor: '#94FBAB' }} aria-label="Recent Activity">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul>
          {conversations.map(conversation => (
            <li key={conversation.id} className="mb-2">
              <button
                className="w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded text-lg"
                onClick={() => setCurrentConversation(conversation)}
                aria-label={`View conversation titled ${conversation.title}`}
              >
                <FaRegComments className="inline mr-2" aria-hidden="true" />
                {conversation.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 bg-white p-4 rounded-lg shadow-md overflow-y-auto mb-4 flex flex-col-reverse"
          role="log"
          aria-live="polite"
        >
          <div className="flex flex-col space-y-2 text-lg">
            {chatHistory.map((msg) => (
              <div key={msg.id} className="flex flex-col items-end mb-2">
                <p className="bg-gray-200 p-2 rounded">{msg.text}</p>
                <p className="text-xs text-gray-500">{msg.timestamp.toLocaleTimeString()}</p>
              </div>
            ))}
            {currentConversation && (
              <p className="mb-4">{currentConversation.content}</p>
            )}
          </div>
        </div>
        <div className="mt-auto flex items-center">
          <textarea
            className="flex-grow p-2 border border-gray-300 rounded-l-lg shadow-md resize-none text-lg"
            rows={2}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Type your message here"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-3 rounded-full shadow-md flex items-center justify-center"
            aria-label="Send message"
          >
            <FaArrowUp aria-hidden="true" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default ChatbotPage;




