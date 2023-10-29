import clientModel from "../models/clientModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "subhoapi@gmail.com",
    pass: "irmqzvzeyqzmnukt",
  },
});

export const addClient = async (req, res) => {
  try {
    let client = await clientModel.findOne({ email: req.body.email });

    if (client) return res.sendStatus(409);

    let org = null;

    client = await clientModel.create({ ...req.body, org, active: true });

    return res.json(client);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delClient = async (req, res) => {
  try {
    await clientModel.findByIdAndDelete(req.body.id);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await clientModel.find();

    return res.json(clients);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
