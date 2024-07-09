import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 4000); // Adjust the time here (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showLanding && (
        <div className="landing-page">
          <div className="landing-text">ZOE AFYA</div>
        </div>
      )}
      <div className="main-content">
        {/* Your main app content goes here */}
        Welcome to the main content of the app!
      </div>
    </div>
  );
}

export default App;
