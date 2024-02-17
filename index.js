const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.js");
dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("assets"));
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use(bodyParser.urlencoded({ extended: true }));

multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(null, file.fieldname + "-" + datetimestamp + ".jpg");
  },
})
const port = process.env.port;
const db_url = process.env.DB_URL;
app.get("/", (req, res) => {
  res.render("general/home");
});

app.listen(port, () => {
  console.log(`app started on http://localhost:${port}`);
  mongoose.connect(db_url).then(() => {
    console.log("connected to database");
  });
});
