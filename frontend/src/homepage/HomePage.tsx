import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css'; // Import the custom CSS file

const HomePage:React.FC = () => {
  const quotes = [
    "Believe you can and you're halfway there.",
    "You are stronger than you think.",
    "Every day is a second chance.",
    "Your mental health matters.",
    "Keep pushing forward."
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 3 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen bg-green-100">
      <header className="text-center py-6 bg-teal-100">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold text-black mt-20"
        >
          Welcome to Zoe Afya
        </motion.h1>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src="https://plus.unsplash.com/premium_photo-1674489620667-eaf4a0094996?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mental Health"
          className="w-full h-64 object-cover mt-20 rounded-lg shadow-md"
        />
      </header>

      <main className="p-6">
        <section className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-2xl mb-4 font-semibold text-gray-800"
          >
            Daily mood check
          </motion.h2>
          <div className="flex justify-between">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-1/2 p-6 bg-blue-200 rounded-lg shadow-md mr-2 transform transition duration-300 hover:scale-105"
            >
              <Link to="/safe-space" className="text-lg font-semibold text-gray-700">
                Safe space
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-1/2 p-6 bg-blue-200 rounded-lg shadow-md ml-2 transform transition duration-300 hover:scale-105"
            >
              <Link to="/schedule" className="text-lg font-semibold text-gray-700">
                Scheduled Therapy
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl mb-4 font-semibold text-gray-800"
          >
            Today's top stories on mental health
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="p-6 bg-gray-200 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Tips to a peaceful mind</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus ipsum at velit pulvinar tristique. Sed leo lacus, luctus eget nisl ac, blandit purus tincidunt...
            </p>
          </motion.div>
        </section>

        <section className="mt-8">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-2xl mb-4 font-semibold text-gray-800"
          >
            Encouragement Quotes
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="quote-container bg-white rounded-lg shadow-md p-6"
          >
            <div
              className="quote-slider"
              style={{ transform: `translateX(-${currentQuoteIndex * 100}%)` }}
            >
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  className="quote w-full h-full flex items-center justify-center"
                  style={{ minWidth: '100%' }}
                >
                  <span className="text-lg font-semibold text-center text-gray-700">{quote}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
