import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useLoginMutation } from "../Slices/UserApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentialas } from "../Slices/AuthSlice";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentialas({ ...res }));
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  return (
    <div className="h-[100vh] ">
      <div className="w-[80%] md:w-[40%] bg-white mx-auto border-2 boreder-black mt-4 p-2 drop-shadow space-y-4  px-4">
        <h1 className="text-xl font-semibold">Sign In</h1>
        <form action="" onSubmit={submitHandler}>
          <div className="flex flex-col w-[90%] md:w-[70%] ">
            <p>Email</p>
            <input
              type="text"
              placeholder="enter email "
              className="p-1 border-2 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-[90%]  md:w-[70%] mt-2">
            <p>Password</p>
            <div className="flex items-center justify-between border-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter Password"
                className="p-1 focus:outline-none"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {!showPassword ? (
                <IoIosEye
                  size={20}
                  className="mr-4 text-blue-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoIosEyeOff
                  size={20}
                  className="mr-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="px-2 mt-2 text-white bg-blue-600 rounded-sm cursor-pointer"
          >
            Sigin
          </button>
        </form>
        <p>
          New user?{" "}
          <Link className="text-blue-600 underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
