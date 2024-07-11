import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Profile" element={<ProfileScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
};

export default App;
