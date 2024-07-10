// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import Register from './loginRegister/register';
import Login from './loginRegister/login';
import PsychologistList from './psychologistPage/Psychologists';
import PsychologistProfile from './singlePsychologist/singlePsychologist';

const Home: React.FC = () => (
  <div>
    <h1>Welcome to Our Psychologist Website</h1>
  </div>
);

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
         {/*  <Route path="/" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/psychologists" element={<PsychologistList />} />
          <Route path="/psychologists/:username" element={<PsychologistProfile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
