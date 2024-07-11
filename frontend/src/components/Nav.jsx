import React from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div className="w-full h-12 text-base transition-all bg-slate-800 ">
        <div className="flex items-center justify-end pr-4 space-x-4">
          <Link to="/login" className="no-underline text-slate-400">
            <button className="flex items-center justify-between cursor-pointer hover:text-white">
              <MdLogin className="text-xl" />
              <p className="pt-2">Singin</p>
            </button>
          </Link>
          <Link to="/register" className="no-underline text-slate-400">
            <div className="flex items-center justify-between cursor-pointer hover:text-white">
              <MdLogout className="text-xl" />
              <p className="pt-2">Singup</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
