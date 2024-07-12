import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <header className="text-center py-6 ">
        <h1 className="text-3xl font-bold text-black mt-16">Welcome to Zoe Afya</h1>
      </header>

      <main className="p-6">
        <section className="mb-8">
          <h3 className="text-2xl mb-4 font-semibold text-gray-800">Daily mood check</h3>
          <div className="flex justify-between">
            <div className="w-1/2 p-6 bg-blue-200 rounded-lg shadow-md mr-2 transform transition duration-300 hover:scale-105">
              <Link to='/safe-space' className="text-xl font-semibold text-gray-700">Safe space</Link>
            </div>
            <div className="w-1/2 p-6 bg-blue-200 rounded-lg shadow-md ml-2 transform transition duration-300 hover:scale-105">
              <Link to='/schedule' className="text-lg font-semibold text-gray-700">Scheduled Therapy</Link>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4 font-semibold text-gray-800">Today's top stories on mental health</h2>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Tips to a peaceful mind</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus ipsum at velit pulvinar tristique. Sed leo lacus, luctus eget nisl ac, blandit purus tincidunt...
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl mb-4 font-semibold text-gray-800">Encouragement Quotes</h2>
          <div className="quote-container bg-white rounded-lg shadow-md p-6">
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
