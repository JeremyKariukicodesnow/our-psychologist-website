import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaRegComments, FaArrowUp, FaBars } from 'react-icons/fa';
import { BASE_URL } from '../../constants/url';

interface Conversation {
  id: number;
  title: string;
  content: string;
}

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  bot?: boolean;
}

const ChatbotPage: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    { id: 1, title: 'Yesterday', content: 'Yesterday\'s conversation content...' },
    { id: 2, title: 'Last Week', content: 'Last week\'s conversation content...' },
  ]);

  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: chatHistory.length + 1,
        text: message,
        timestamp: new Date(),
        bot: false,
      };
      setChatHistory([...chatHistory, userMessage]);
      setMessage('');
      setError(null);
      setLoading(true);

      try {
        const response = await axios.post(`${BASE_URL}/api/chat/chat`, { message: userMessage.text });
        const botMessage: Message = {
          id: chatHistory.length + 2,
          text: response.data.response,
          timestamp: new Date(),
          bot: true,
        };
        setChatHistory((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message to chatbot:", error);
        setError("Sorry, something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleNewChat = () => {
    setCurrentConversation(null);
    setChatHistory([]);
    setError(null);
  };

  return (
    <div className="flex h-screen font-poppins bg-gray-100" role="main">
      <aside className={`md:block md:w-1/4 lg:w-1/5 bg-green-300 border-r border-gray-300 p-4 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 fixed z-40 md:z-auto top-0 left-0 h-full`} style={{ backgroundColor: '#94FBAB' }} aria-label="Recent Activity">
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
        <button
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded text-lg hover:bg-blue-600 transition"
          onClick={handleNewChat}
          aria-label="Start a new chat"
        >
          New Chat
        </button>
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
              <div key={msg.id} className={`flex flex-col ${msg.bot ? 'items-start' : 'items-end'} mb-2`}>
                <p className={`p-2 rounded-lg ${msg.bot ? 'bg-blue-200' : 'bg-gray-200'}`}>{msg.text}</p>
                <p className="text-xs text-gray-500">{msg.timestamp.toLocaleTimeString()}</p>
              </div>
            ))}
            {currentConversation && (
              <p className="mb-4">{currentConversation.content}</p>
            )}
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <div className="loading-dots flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mt-auto flex items-center">
          <textarea
            className="flex-grow p-2 border border-gray-300 rounded-l-lg shadow-md resize-none text-lg focus:outline-none focus:border-blue-500"
            rows={2}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            aria-label="Type your message here"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-3 rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 transition"
            aria-label="Send message"
          >
            <FaArrowUp aria-hidden="true" />
          </button>
        </div>
      </main>
      {/* Toggle button for small screens */}
      <button
        className="md:hidden fixed top-8 left-0 bg-blue-300 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition z-50"
        onClick={() => setShowSidebar(!showSidebar)}
        aria-label="Toggle recent activity"
      >
        <FaBars />
      </button>
      {showSidebar && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setShowSidebar(false)} aria-hidden="true"></div>}
    </div>
  );
};

export default ChatbotPage;
