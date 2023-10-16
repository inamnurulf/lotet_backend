const { default: mongoose } = require("mongoose");
const UserModels = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALTROUNDS, 10);
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

exports.postUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    if (!newUser || Object.keys(newUser).length === 0) {
      res.json({ error: "Bad request. Request body is empty." }).status(400);
      next();
    }
    const existingUser = await UserModels.findOne({
      $or: [{ nim: newUser.nim }, { email: newUser.email }],
    });
    if (existingUser) {
      res
        .status(400)
        .json({ error: "User with the same nim or email already exists." });
      return next();
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const User = new UserModels({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      nim: newUser.nim,
    });
    const savedUser = await User.save();

    const userResponse = {
      name: savedUser.name,
      email: savedUser.email,
      token: generateToken({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        nim: savedUser.nim,
        role: savedUser.role,
      }),
    };
    res.status(201).json(userResponse);
    next();
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Server Error!" });
    next();
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModels.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        nim: user.nim,
        role: user.role,
      });
      res.cookie("Authorization", token).json({
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!" });
    next(error);
  }
};

exports.test = async (req, res, next) => {
  console.log(req.user);
  return res.status(200).json({ meassage: "DONE" });
};
