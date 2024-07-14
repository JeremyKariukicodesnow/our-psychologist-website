import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface User {
  username: string;
  email: string;
  role: string;
}

interface DecodedJwtPayload extends JwtPayload {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  isPsychologist: boolean;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  isPsychologist: false,
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

const decodeToken = (token: string): User => {
  const decoded: DecodedJwtPayload = jwtDecode(token);
  return {
    username: decoded.user.username,
    email: decoded.user.email,
    role: decoded.user.role,
  };
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = decodeToken(token);
      return decodedUser;
    }
    return null;
  });

  const isLoggedIn = !!user;
  const isPsychologist = user?.role === 'psychiatrist'; // Check for 'psychiatrist'

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, isPsychologist, logout }}>
      {children}
    </UserContext.Provider>
  );
};
