const express = require("express");
const path = require("path");

const app = express();

//setting up public folder
const public = path.join(__dirname, "../public/images");
app.use("/public", express.static(public));
app.use(express.static(public));

//routes

app.get("/", (req, res) => {
  res.send("index");
});

app.listen(4000, () => {
  console.log("app running");
});
