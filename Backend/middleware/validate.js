const express = require("express");

const validate = (req, res, next) => {
  try {
    if (req.query.role === "admin") {
      if (
        req.method === "PUT" ||
        req.method === "PATCH" ||
        req.method === "DELETE"
      ) {
        next();
      } else {
        res.send("You are  not authorized to do thi soperation");
      }
    }
    else {
        res.send("You are  not authorized to do thi soperation");
      }
  } catch (err) {
    console.log("something went wrong");
  }
};

module.exports = {
  validate,
};
