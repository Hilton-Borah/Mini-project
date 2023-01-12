const express = require("express");
const { MiniModel } = require("../model/modelSchema");
const { validate } = require("../middleware/validate")
var jwt = require('jsonwebtoken');
const { logger } = require("../middleware/logger");
const fs = require("fs")
const { passwordCheck } = require("../middleware/password")


const miniRouter = express.Router();



miniRouter.get("/", async (req, res) => {
  try {
    const data = await MiniModel.find()
    res.send(data);
    console.log(data)
  } catch (err) {
    res.send("err");
  }
});

miniRouter.use(passwordCheck)
// Post req
miniRouter.post("/register", async (req, res) => {
  let data = req.body;
  try {
    let email = await MiniModel.find({ email: data.email });
    if (email.length > 0) {
      res.send({ "err": "User already exist, please login" })
    } else {
      let mini = new MiniModel(data);
      console.log(mini);
      await mini.save();
      res.send({ "success": "Register successfully" });
    }
  } catch (err) {
    res.send({ "err": "You are not registered" })
  }
});

miniRouter.use(logger)

miniRouter.post("/login", async (req, res) => {
  let { name, email, pass } = req.body;
  try {
    let mini = await MiniModel.find({ name, email, pass });
    const token = jwt.sign({ hilton: 'hilton' }, 'hilton');
    console.log(mini)
    if (mini.length > 0) {
      return res.send({ "success": "Login successfully", "token": token, "userdata": mini[0] });
    }
    else {
      return res.send({ "err": "You are not registered" })
    }
  } catch (err) {
    res.send({ "err": err })
  }
});

// Delete request
miniRouter.delete("/delete/:id", validate, async (req, res) => {
  let id = req.params.id;
  try {
    let data = req.body;
    let notes = await MiniModel.findByIdAndDelete({ _id: id }, data);
    res.send(`id ${id} has been deleted from DataBase`);
    console.log(notes);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

// Patch Request
miniRouter.patch("/update/:id", validate, async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    const notes = await MiniModel.findByIdAndUpdate({ _id: id }, data);
    console.log(notes);
    res.send(` Document with ${id} has been updated `);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});






module.exports = {
  miniRouter,
};
