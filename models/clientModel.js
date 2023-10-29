import mongoose from "mongoose";

const clientModel = mongoose.Schema({
  org: String,
  image: Boolean,
  status: Boolean,
  name: String,
  email: String,
  company: String,
  country: String,
  contact: String,
});

export default mongoose.model("clientModel", clientModel);
