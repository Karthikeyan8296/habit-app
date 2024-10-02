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

const Habit = require("./models/habit");
//Endpoint to create an New Habit in the backend//
//req - request | res - response//
app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;
    const newHabit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });

    // after doing this we need to save it in backend//
    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Network Error" });
  }
});
