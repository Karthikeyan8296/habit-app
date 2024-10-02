const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://karthik:Kar%402004@mindpath.jlbkf.mongodb.net/")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    console.log("Error Connected to mongoDB", error);
  });

app.listen(port, () => {
  console.log("Server running on port 3000");
});
