import React, { useState, useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import About from './pages/about/About';
import HomePage from './homepage/HomePage';
import Articles from './pages/articles/Articles';
import SingleArticle from './pages/articles/SingleArticle';
import ArticleWrite from './pages/articles/ArticleWrite';
import NavBar  from './components/navbar/NavBar';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const isLoggedIn = true
  const isPsychologist = true

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 2000); // Adjust the time here (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
    <div className="App">
      {showLanding && (
        <div className="landing-page">
          <div className="landing-text">YOU ARE BEAUTIFUL</div>
        </div>
      )}
      {!showLanding && (
        <div>
          <NavBar isLoggedIn={isLoggedIn} isPsychologist={isPsychologist} />
            <Routes>
              <Route path='/' index element={<LandingPage />}></Route> 
              <Route path='/home' element={<HomePage />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/articles' element={<Articles />}></Route>
              <Route path='/articles/:id' element={<SingleArticle />}></Route>
              {isLoggedIn && isPsychologist && (
                <Route path='/articles/new' element={<ArticleWrite />}></Route>
              )}
            </Routes>
      </div>
      ) }
      
    </div>
    </Router>
  );
}

export default App;
