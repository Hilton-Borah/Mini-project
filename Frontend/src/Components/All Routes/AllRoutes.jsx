import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
