const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const result = await User.find({}).populate("blogs", { title: 1, url: 1 });
  res.json(result);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const minUserNameLength = 3;
  const minPasswordLength = 3;

  const isUserNameEqualMinLength = username < minUserNameLength;
  const isPasswordMinLength = password < minPasswordLength;

  const isUserExists = await User.findOne({ username });

  if (
    username === null ||
    username === undefined ||
    password === null ||
    password === undefined
  ) {
    return res
      .status(400)
      .json({ error: "username and password must be define" });
  }

  if (isUserExists) {
    return res.status(400).json({ error: "username must be unique" });
  }

  if (isPasswordMinLength) {
    return res.status(400).json({ error: "password length must be minimum 3" });
  }

  if (isUserNameEqualMinLength) {
    return res.status(400).json({ error: "username length must be minimum 3" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    hashedPassword,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
