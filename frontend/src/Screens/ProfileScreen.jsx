import React, { useEffect, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../Slices/UserApiSlice";
import { setCredentialas } from "../Slices/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateUserMutation();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("password not match");
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentialas({ ...res }));
      toast.success("Profile update successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="bg-white/10">
        <div className="bg-white w-[80%] md:w-[50%]  lg:w-[40%] p-2 border-2 border-slate-300 mx-auto mt-4 drop-shadow-sm">
          <h2 className="p-2 text-xl font-semibold">Update Profile</h2>
          <form action="" className="p-2 md:text-lg " onSubmit={submitHandler}>
            <p className="">Name</p>
            <input
              type="text"
              className="border-2 border-slate-200 w-[90%] "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="mt-4 ">Email</p>
            <input
              type="email"
              className="border-2 border-slate-200 w-[90%] "
              placeholder="Enter mail"
              value={email}
              onChange={(e) => setName(e.target.email)}
            />
            <p className="mt-4">Password</p>
            <div className="border-2 border-slate-200 w-[90%] flex items-center justify-between ">
              <input
                type={showPassword ? "text" : "password"}
                className="focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!showPassword ? (
                <IoIosEye
                  size={20}
                  className="mr-2 text-blue-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoIosEyeOff
                  size={20}
                  className="mr-2 text-blue-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <p className="mt-4">Confrim Password</p>
            <div className="border-2 border-slate-200 w-[90%] flex items-center justify-between ">
              <input
                type={showPassword ? "text" : "password"}
                className="focus:outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!showPassword ? (
                <IoIosEye
                  size={20}
                  className="mr-2 text-blue-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoIosEyeOff
                  size={20}
                  className="mr-2 text-blue-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <button
              className="px-2 mt-4 text-white bg-blue-500 rounded-sm cursor-pointer"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
