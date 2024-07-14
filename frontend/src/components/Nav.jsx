import React from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { logout } from "../Slices/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Slices/UserApiSlice";

const Nav = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logedout Successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="w-full h-12 text-base transition-all bg-slate-800 ">
        <div className="flex items-center justify-between px-4 ">
          <div className="pt-2 text-xl text-white">Mern Auth</div>
          {userInfo === null ? (
            <div className="flex items-center justify-around space-x-4">
              <Link to="/login" className="no-underline text-slate-400">
                <button className="flex items-center justify-between cursor-pointer hover:text-white">
                  <MdLogin className="text-xl" />
                  <p className="pt-2">SignIn</p>
                </button>
              </Link>
              <Link to="/register" className="no-underline text-slate-400">
                <div className="flex items-center justify-between cursor-pointer hover:text-white">
                  <MdLogout className="text-xl" />
                  <p className="pt-2">SignUp</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center pt-2 pr-2 text-white cursor-pointer group">
              <p className="text-lg ">{userInfo.name}</p>
              <FaCaretDown size={20} className="pl-2 cursor-pointer " />

              <div className="absolute  opacity-0 bg-white border-2 top-10 border-slate-400 rounded w-[100px] py-2 min-h-min z-[10] group-hover:transition-all group-hover:opacity-100">
                <div className="flex flex-col ">
                  <Link
                    to="/profile"
                    className="w-full pl-2 mx-auto text-black transition-all cursor-pointer hover:text-white hover:bg-blue-600"
                  >
                    Profile
                  </Link>
                  <Link
                    to=""
                    className="w-full pl-2 mx-auto text-black transition-all cursor-pointer hover:text-white hover:bg-blue-600"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
