import React, { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // register via API
  const register = async (payload) => {
    const res = await API.post("/register", payload);
    // server returns created user info (per your controller)
    return res.data;
  };

  // login - server sets cookie; server returns user info (name,email,id,role)
  const login = async ({ email, password }) => {
    const res = await API.post("/login", { email, password });
    // server returns user info in body
    const u = {
      id: res.data.id ?? res.data.user?.id,
      name: res.data.name ?? res.data.user?.name,
      email: res.data.email ?? res.data.user?.email,
      role: res.data.role ?? res.data.user?.role,
    };
    setUser(u);
    return u;
  };

  // logout - clears cookie on server
  const logout = async () => {
    await API.get("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
