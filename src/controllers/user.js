const { default: mongoose } = require("mongoose");
const UserModels = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const saltRounds = parseInt(process.env.SALTROUNDS, 10);
const jwt = require("jsonwebtoken");
const generateVerifyToken = require("../lib/generateTokenVerify");

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.postUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    if (!newUser || Object.keys(newUser).length === 0) {
      return res.json({ error: "Bad request. Request body is empty." }).status(400);
      next();
    }
    const existingUser = await UserModels.findOne({
      $or: [{ nim: newUser.nim }, { email: newUser.email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with the same nim or email already exists." });
    }

    const tokenverif = generateVerifyToken();
    const mailOptions = {
      from: `Lotet Verification <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: "Lotet Account Verification",
      html: `
        <main>
          <style>
          </style>
          <div>
           <h2>Verify Your Account</h2>
            <div>This is your token ${tokenverif}</div>
          </div>
        </main>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({
          message: "Error occurred while sending email",
          code: err.code,
        })
        .json({ error: "Error occurred while sending email" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const User = new UserModels({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      token: tokenverif,
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
    return res.status(201).json(userResponse);
  } catch (error) {
    console.error("Error creating User:", error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModels.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Please Sign UP",
      });
    }

    if (user.verified !== true) {
      return res.status(401).json({ error: "Unverified" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        nim: user.nim,
        role: user.role,
      });
      return res.cookie("Authorization", token).json({
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      return res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.verifyuser = async (req, res, next) => {
  try {
    const { email, verifytoken } = req.body;
    const userToVerify = await UserModels.findOne({ email });

    if (!userToVerify) {
      return res.status(404).json({
        message: "Please Sign UP",
      });
    }

    if (userToVerify.verified === true) {
      return res.status(401).json({ error: "Account has been verified" });
    }

    if (verifytoken == userToVerify.token) {
      userToVerify.verified = true;
    } else {
      return res.status(401).json({ error: "Token false" });
    }
  } catch {
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getNewToken = async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModels.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "Please Sign UP",
    });
  }

  const tokenverif = generateVerifyToken();
    const mailOptions = {
      from: `Lotet Verification <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: "Lotet Account Verification",
      html: `
        <main>
          <style>
          </style>
          <div>
           <h2>Verify Your Account</h2>
            <div>This is your token ${tokenverif}</div>
          </div>
        </main>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({
          message: "Error occurred while sending email",
          code: err.code,
        })
        .json({ error: "Error occurred while sending email" });
    }
    return res.status(201).json({message: "Token sended"});
};

exports.signOut = async (req, res, next) => {
  res.clearCookie("Authorization"); 
  res.status(200).json({ message: "You are now logged out." });
};
