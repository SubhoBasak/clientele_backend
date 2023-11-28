import projectModel from "../models/projectModel.js";

export const getProjects = async (req, res) => {
  try {
    const list = await projectModel.find().lean();
    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const addProject = async (req, res) => {
  try {
    await projectModel.create(req.body);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const delProject = async (req, res) => {
  try {
    await projectModel.findByIdAndDelete(req.body.id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
