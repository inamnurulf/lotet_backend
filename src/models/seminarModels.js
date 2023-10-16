const mongoose = require("mongoose");

const seminarSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    category: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seminar", seminarSchema);
