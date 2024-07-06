import mongoose from "mongoose";
import bycypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycypt.genSalt(10); //10 is no of charter
  this.password = await bycypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredpassword) {
  return await bycypt.compare(enteredpassword, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
