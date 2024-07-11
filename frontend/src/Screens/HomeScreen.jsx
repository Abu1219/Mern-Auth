import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
      <div className="w-[80%] h-[20%] bg-slate-100 mx-auto mt-4 border-1 border-black/10 drop-shadow-sm flex flex-col items-center justify-center md:w-[50%]">
        <h1>Mern Auth</h1>
        <p className="text-sm text-center md:text-base lg:text-lg">
          This is a boilerplate for MERN authentication that stores a JWT in an
          HTTP-Only cookie. It also uses Redux Toolkit and the Tailwind CSS.
        </p>
        <div className="flex mb-4 space-x-2 text-sm md:text-base">
          <Link to="/login">
            <button className="p-1 text-white bg-blue-600 rounded-sm cursor-pointer">
              Signin
            </button>
          </Link>
          <Link to="/register">
            <button className="p-1 text-white rounded-sm cursor-pointer bg-slate-600 ">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
