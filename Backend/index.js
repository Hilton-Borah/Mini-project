const express = require("express");
const { connect } = require("./config/db");
require("dotenv").config();
const { miniRouter } = require("./Controller/miniRouter");
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());

app.use("/mini", miniRouter);

app.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("connected to data base");
  } catch (err) {
    console.log("err while starting the port");
  }

  console.log("connected to server");
});
