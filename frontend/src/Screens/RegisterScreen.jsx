import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../Slices/UserApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentialas } from "../Slices/AuthSlice";
const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("password and confirm password not match");
    try {
      const res = await register({ name, email, password }).unwrap();
      console.log({ ...res });
      dispatch(setCredentialas({ ...res }));
      toast.success("User added sussefully");
      navigate("/");
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };
  return (
    <div className="h-[100vh] ">
      <div className="w-[80%] md:w-[40%] bg-white mx-auto border-2 boreder-black mt-4 p-2 drop-shadow space-y-4  px-4">
        <h1 className="text-xl font-semibold">Register</h1>
        <form action="" onSubmit={submitHandler}>
          <div className="flex flex-col w-[90%] md:w-[70%] ">
            <p className="">Name</p>
            <input
              type="text"
              placeholder="enter name "
              className="p-1 border-2 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[90%] md:w-[70%] mt-4 ">
            <p>Email Address</p>
            <input
              type="email"
              placeholder="enter email "
              className="p-1 border-2 focus:outline-none"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[90%]  md:w-[70%] mt-2">
            <p>Password</p>
            <div className="flex items-center justify-between border-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter Password"
                className="p-1 focus:outline-none"
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
          <div className="flex flex-col w-[90%]  md:w-[70%] mt-2">
            <p>Confirm Password</p>
            <div className="flex items-center justify-between border-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter Password"
                className="p-1 focus:outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="p-1 mt-4 text-white bg-blue-600 rounded-sm cursor-pointer"
            type="submit"
          >
            Signup
          </button>
        </form>
        <p className="mb-2">
          Already have an account?{" "}
          <Link className="text-blue-600 underline" to="/login">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
