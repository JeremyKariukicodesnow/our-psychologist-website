import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import Register from './loginRegister/register';
import Login from './loginRegister/login';
import PsychologistList from './psychologistPage/Psychologists';
import PsychologistProfile from './singlePsychologist/singlePsychologist';
import LandingPage from './pages/landing/LandingPage';
import About from './pages/about/About';
import HomePage from './homepage/HomePage';
import Articles from './pages/articles/Articles';
import SingleArticle from './pages/articles/SingleArticle';
import ArticleWrite from './pages/articles/ArticleWrite';
import NavBar from './components/navbar/NavBar';
import './App.css';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const isLoggedIn = true;
  const isPsychologist = true;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 2000); // Adjust the time here (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="App">
          {showLanding ? (
            <div className="landing-page">
              <div className="landing-text">YOU ARE RADIANT</div>
            </div>
          ) : (
            <div>
              <NavBar isLoggedIn={isLoggedIn} isPsychologist={isPsychologist} />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<SingleArticle />} />
                {isLoggedIn && isPsychologist && (
                  <Route path="/articles/new" element={<ArticleWrite />} />
                )}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/psychologists" element={<PsychologistList />} />
                <Route path="/psychologists/:username" element={<PsychologistProfile />} />
              </Routes>
            </div>
          )}
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
