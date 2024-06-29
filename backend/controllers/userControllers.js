import asyncHandler from "express-async-handler";

// @des Register a New User
//  route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register User" });
});

// @des Auth user/setToken
//  route POST /api/users/auth
// @acess Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "AuthUser" });
});

// @des Logout user
//  route POST /api/users/logout
// @acess Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout User" });
});

// @des Get User Profile
//  route GET /api/users/profile
// @acess Private
const userProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User Profile" });
});

// @des Update User Profile
//  route Put /api/users/profile
// @acess Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});
export { registerUser, authUser, logoutUser, userProfile, updateUserProfile };
