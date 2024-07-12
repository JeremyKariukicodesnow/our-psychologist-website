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
import SchedulePage from './pages/schedule/Schedule';
import SafeSpace from './components/moodCheck/SafeSpace';
import AppointmentsPage from './pages/schedule/Appointments';
import Footer from './components/footer/Footer';
import Chatbotpage from './pages/chatbot/Chatbotpage';
import './App.css';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const isLoggedIn = true;
  const isPsychologist = true;
  const [currentText, setCurrentText] = useState<string[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 5000); // Adjust the time here (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const words = [
      'YOUR MENTAL HEALTH,',
      'YOUR WELL-BEING,',
      'A PRECIOUS GEM,',
      'ALWAYS WORTH SEEING.',
      'TAKE THE TIME,',
      'GIVE SELF-CARE,',
      'IN EVERY MOMENT,',
      'BE AWARE.'
    ];
    let index = 0
    const interval = setInterval(() => {
      if (index < words.length){
        setCurrentText((prev) => [...prev,words[index]])
        index ++
      } else{
          clearInterval(interval)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])


  return (
    <UserProvider>
      <Router>
        <div className="App">
          {showLanding ? (
            <div className="landing-page">
              <div className="landing-text">{currentText.map((text, i) => (
                <div key={i}>{text}</div>
              ))}</div>
            </div>
          ) : (
            <div>
              <NavBar isLoggedIn={isLoggedIn} isPsychologist={isPsychologist} />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/chatbot" element={<Chatbotpage />} />
                <Route path="/articles/:id" element={<SingleArticle />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/safe-space" element={<SafeSpace />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                {isLoggedIn && isPsychologist && (
                  <Route path="/articles/new" element={<ArticleWrite />} />
                )}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/psychologists" element={<PsychologistList />} />
                <Route path="/psychologists/:username" element={<PsychologistProfile />} />

              </Routes>
              <Footer />
            </div> 
            
          )}
        </div>
       
      </Router>
      
    </UserProvider>
  );
};

export default App;