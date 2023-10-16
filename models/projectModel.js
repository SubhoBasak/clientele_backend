import mongoose from "mongoose";

const projectModel = mongoose.Schema({
  image: Boolean,
  name: String,
  info: String,
  date: Date,
  done: Boolean,
});

export default mongoose.model("projectModel", projectModel);
