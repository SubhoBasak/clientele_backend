import noteModel from "../models/noteModel.js";

export const addNote = async (req, res) => {
  try {
    await noteModel.create(req.body);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    return res.json(notes);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delNote = async (req, res) => {
  try {
    await noteModel.findByIdAndDelete(req.body.id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
