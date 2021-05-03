import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: "String", required: true },
    country: { type: "String", required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScheme);
export default User;
