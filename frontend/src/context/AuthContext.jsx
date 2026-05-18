import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = async (username, password) => {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const res = await API.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    localStorage.setItem("token", res.data.access_token);
    setToken(res.data.access_token);
    navigate("/");
  };

  const register = async (username, email, password) => {
    await API.post("/auth/register", { username, email, password });
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);