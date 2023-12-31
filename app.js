import express from "express";
import upload from "express-fileupload";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import clientRouter from "./routers/clientRouter.js";
import noteRouter from "./routers/noteRouter.js";
import projectRouter from "./routers/projectRouter.js";
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

app.use("/client", clientRouter);
app.use("/note", noteRouter);
app.use("/project", projectRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT || 5000, (x) => console.log("Server is running."));
