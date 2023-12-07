const { default: mongoose } = require("mongoose");
const seminarModels = require("../models/seminarModels");
const kerjaPraktikModels = require("../models/kerjaPraktikModels");
const UserModels = require("../models/userModel");

const { default: mongoose } = require("mongoose");
const seminarModels = require("../models/seminarModels");
const kerjaPraktikModels = require("../models/kerjaPraktikModels");
const UserModels = require("../models/userModel");

exports.getNewCarousell = async (req, res, next) => {
  try {
    const latestKerjaPraktik = await kerjaPraktikModels
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .select({
        title: 1,
        image: 1
      })
      .lean(); 
    const latestSeminars = await seminarModels
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .select({
        title: 1,
        image: 1
      })
      .lean(); 

    // Add type field to each item
    latestKerjaPraktik.forEach((item) => (item.type = "kerjaPraktik"));
    latestSeminars.forEach((item) => (item.type = "seminar"));

    const combinedResult = [...latestKerjaPraktik, ...latestSeminars];

    shuffleArray(combinedResult);

    if (combinedResult.length === 0) {
      return res.status(404).json({
        message: "No Kerja Praktik or Seminar Found",
      });
    }

    return res.status(200).json(combinedResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

