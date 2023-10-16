import orgModel from "../models/orgModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "subhoapi@gmail.com",
    pass: "irmqzvzeyqzmnukt",
  },
});

export const register = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });

    if (user) return res.sendStatus(409);

    let org;

    if (req.user) {
      org = req.user.org;
    } else {
      org = await orgModel.create({ name: req.body.email });
    }

    user = await userModel.create({ ...req.body, org });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const verification = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404);

    if (user.verified) return res.sendStatus(405);

    user.otp = Number.parseInt(Math.random() * (999999 - 100000) + 100000);
    await user.save();

    await transporter.sendMail({
      from: "subhoapi@gmail.com",
      to: user.email,
      subject: "Verification OTP",
      text: "Your OTP: " + user.otp,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const verify = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404);

    if (user.verified) return res.sendStatus(405);

    if (user.otp !== req.body.otp) return res.sendStatus(401);

    user.otp = null;
    user.verified = true;

    await user.save();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404);

    if (!user.verified) return res.sendStatus(405);

    if (user.password != req.body.password) return res.sendStatus(401);

    const token = jwt.sign({ payload: { id: user.id } }, "<Auth@2023/>");

    return res.send(token);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const forgot = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404);

    user.otp = Number.parseInt(Math.random() * (999999 - 100000) + 100000);
    await user.save();

    await transporter.sendMail({
      from: "subhoapi@gmail.com",
      to: user.email,
      subject: "Verification OTP",
      text: "Your OTP: " + user.otp,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const reset = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404);

    if (user.otp != req.body.otp) return res.sendStatus(401);

    user.password = req.body.password;
    await user.save();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const editUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { email: req.body.email },
      req.body
    );

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delUser = async (req, res) => {
  try {
    await userModel.findOneAndDelete({ email: req.body.email });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
