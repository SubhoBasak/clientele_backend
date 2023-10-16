import express from "express";
import upload from "express-fileupload";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload({ limits: 5242880 }));
app.use("/static", express.static("static"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

app.use("/user", userRouter);

app.listen(process.env.PORT || 5000, () => console.log("Server is running."));
