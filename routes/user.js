const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
  const username = req.body.username;
  User.find({ username: username })
    .then((user) => {
      res.render("user/profile", { user: user });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(username + " " + password);
  if (!username || !password) return res.redirect("/user");
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});




router.get("/login", (req, res) => {
  res.render("user/login");
});

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.redirect("/login?message=user not found");
//   }
//   const passwordMatch = await bcrypt.compare(password, user.password);
//   if (!passwordMatch) {
//     return res.redirect("/login?message=incorrect password");
//   }
//   res.render("user/profile", { user });
// });

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

module.exports = router;
