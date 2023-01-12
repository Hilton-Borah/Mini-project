const bcrypt = require("bcrypt");
const authModel = require("../Models/auth");
const createError = require("../utils/error");
var jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  const user = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    const CreateUser = new authModel({
      name: user.name,
      email: user.email,
      password: hash,
    });
    await CreateUser.save();
    return res.status(201).send("Registered Successfully");
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const user = req.body;
  try {
    const gotUser = await authModel.findOne({
      email: user.email,
    });
    // console.log(findLogin);
    if (gotUser == null) return next(createError(404, "User not found"));
    const isPassword = await bcrypt.compare(user.password, gotUser.password);
    console.log(isPassword);
    if (!isPassword)
      return next(createError(404, "Please check your credentials again !"));
    // console.log(isPassword);

    var token = jwt.sign(
      {id: gotUser._id, Admin: gotUser.isAdmin},
      process.env.Jwt
    );
    // console.log(token);
    const {password, isAdmin, ...otherDetails} = gotUser._doc; //._doc is key in this findLogin
    return res
      .cookie("access_token", token, {httpOnly: true})
      .status(200)
      .send({...otherDetails});
  } catch (err) {
    next(err);
  }
};

module.exports = {login, register};