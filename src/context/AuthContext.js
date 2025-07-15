import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem("username") || null);

  const login = (username, token) => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
    setUsername(username);
  };

  const logout = () => {
    sessionStorage.clear();
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
