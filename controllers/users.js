const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "ASSIGNMENT";

// FOR SIGNUP A USER

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = JWT.sign({ email: email, id: result._id }, SECRET_KEY);
    res.send(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "something went wrong" });
  }
};

// FOR SIGNIN A USER

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = JWT.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.send({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    
  }
};

// FOR GETTING DATA OF USERS
exports.getUsers = async (req, res) => {
  let users = await User.find();
  res.send(users);
};

