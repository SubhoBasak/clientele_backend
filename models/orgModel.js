import mongoose from "mongoose";

const orgModel = mongoose.Schema({
  name: String,
});

export default mongoose.model("orgModel", orgModel);
