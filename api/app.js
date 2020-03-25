const express = require("express");
const conectedDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();

conectedDB();
app.use(express.json({ extended: true }));
const publicFolder = path.join(__dirname, "/public");
app.use("/public", express.static(publicFolder));
app.use(express.static(publicFolder));
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*"
  })
);
app.get("/", (req, res) => {
  res.json("app running");
});
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use("/api/banners", require("./routes/api/banners"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/news", require("./routes/api/news"));
app.use("/api/videos", require("./routes/api/videos"));
app.use("/api/menus", require("./routes/api/menus"));
app.use("/api/live", require("./routes/api/live"));
app.use("/api/nationalprayers", require("./routes/api/nationalPrayers"));
app.use("/api/timer", require("./routes/api/time"));

app.use((req, res, next) => {
  const error = new Error("Item not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
