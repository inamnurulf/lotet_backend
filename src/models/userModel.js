const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nim: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
