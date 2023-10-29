import mongoose from "mongoose";

const noteModel = mongoose.Schema(
  {
    org: String,
    title: String,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("noteModel", noteModel);
