import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import mongoose, { mongo } from "mongoose";
import generateToken from "../utility/generateToken.js";

// @des Register a New User
//  route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invali user data");
  }
});

// @des Auth user/setToken
//  route POST /api/users/auth
// @acess Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invali email/password");
  }
});

// @des Logout user
//  route POST /api/users/logout
// @acess Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logout" });
});

// @des Get User Profile
//  route GET /api/users/profile
// @acess Private
const userProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @des Update User Profile
//  route Put /api/users/profile
// @acess Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || req.user.name;
    user.email = req.body.email || req.user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const userData = await user.save();
    res.status(200).json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    });
  } else {
    res.status(401);
    throw new Error("no user found");
  }
});
export { registerUser, authUser, logoutUser, userProfile, updateUserProfile };
