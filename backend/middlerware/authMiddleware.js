import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protector = expressAsyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decorder = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decorder.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

export { protector };
