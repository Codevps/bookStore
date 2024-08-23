const express = require("express");
const User = require("../models/user");
const router = express.Router();
router.post("/sign-up", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Error creating user" });
  }
});

router.get("/sign-in", async (req, res) => {
  try {
    const { ...data } = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user || user.password.toString() !== data.password.toString()) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    res.send(user);
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send({ message: "Error finding user" });
  }
});

module.exports = router;
