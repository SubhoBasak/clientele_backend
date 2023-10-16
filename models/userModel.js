import mongoose from "mongoose";

const userModel = mongoose.Schema({
  org: String,
  image: Boolean,
  name: String,
  email: String,
  otp: Number,
  password: String,
  verified: Boolean,
  contact: String,
});

export default mongoose.model("userModel", userModel);
