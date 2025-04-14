// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = async (email, password) => {
//     if (email && password) {
//       const users = JSON.parse(localStorage.getItem("users") || "[]");
//       const userExists = users.find((u) => u.email === email);

//       if (!userExists) return false;

//       const userData = { email };
//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("token", `demo-token-${Math.random()}`);

//       setUser(userData);
//       setIsLoggedIn(true);

//       return true;
//     }
//     return false;
//   };

//   const signup = async (email, password, userData = {}) => {
//     if (email && password) {
//       const users = JSON.parse(localStorage.getItem("users") || "[]");
//       if (users.some((u) => u.email === email)) return false;

//       const newUser = { email, ...userData };
//       users.push(newUser);
//       localStorage.setItem("users", JSON.stringify(users));
//       localStorage.setItem("user", JSON.stringify(newUser));
//       localStorage.setItem("token", `demo-token-${Math.random()}`);

//       setUser(newUser);
//       setIsLoggedIn(true);

//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }