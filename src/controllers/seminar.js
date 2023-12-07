const { default: mongoose } = require("mongoose");
const seminarModels = require("../models/seminarModels");

exports.postSeminar = async (req, res, next) => {
  try {
    const newSeminar = req.body;
    if (!newSeminar || Object.keys(newSeminar).length === 0) {
      return res.json({ error: "Bad request. Request body is empty." }).status(400);
    }

    const seminar = new seminarModels(newSeminar);
    const savedSeminar = await seminar.save();
    return res.status(201).json(savedSeminar);
  } catch (error) {
    console.error("Error creating Seminar:", error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getSeminar = async (req, res, next) => {
  try {
    const Seminar = await seminarModels.find();
    if (!Seminar || Seminar.length === 0) {
      return res.status(404).json({
        message: "No Seminar Found",
      });
    }
    return res.status(200).json(Seminar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getSeminarByUserId = async (req, res, next) => {
    const {id} = req.params; 
    try {
        
        const seminars = await seminarModels.find({
            user_id: id,
        });

        if (!seminars || seminars.length === 0) {
            return res.status(404).json({
                message: "No Seminars Found for the User",
            });
        }

        res.status(200).json(seminars);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error!" });
        next(error);
    }
};


exports.getSeminarByDate = async (req, res, next) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const seminar = await seminarModels.find({
      eventTime: { $gte: startDate, $lte: endDate },
    });

    if (!seminar || seminar.length === 0) {
      return res.status(404).json({
        message: "No Seminar Found",
      });
    }

    return res.status(200).json(seminar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getSeminarById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Seminar = await seminarModels.findById(id);
    if (!Seminar || Seminar.length === 0) {
      return res.status(404).json({
        message: "No Seminar Found",
      });
    }

    return res.status(200).json(Seminar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.patchSeminar = async (req, res, next) => {
  try {
    const { id } = req.params;

    //cek valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "No such Missions " + id,
      });
    }
    const SeminarToUpdate = await seminarModels.findById(id);

    // Check if the Seeker exists in the database
    if (!SeminarToUpdate) {
      return res.json({ error: "Seminar not found." }).status(404);
    }

    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.json({ error: "Bad request. Request body is empty." }).status(400);
    }

    // Update the seminar document with the new data
    if (updatedData.title) {
      SeminarToUpdate.title = updatedData.title;
    }
    if (updatedData.user_id) {
      SeminarToUpdate.user_id = updatedData.user_id;
    }
    if (updatedData.details) {
      SeminarToUpdate.details = updatedData.details;
    }

    if (updatedData.image) {
      SeminarToUpdate.image = updatedData.image;
    }

    if (updatedData.category) {
      SeminarToUpdate.category = updatedData.category;
    }
    if(updatedData.location){
      SeminarToUpdate.location = updatedData.location;
    }
    if(updatedData.additional){
      SeminarToUpdate.additional = updatedData.additional;
    }

    const updatedSeminar = await SeminarToUpdate.save();
    return res.status(200).json(updatedSeminar);
  } catch {
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.deleteSeminar = async (req, res, next) => {
  try {
    const { id } = req.params;

    //cek valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "No such Seminar",
      });
    }

    const Seminar = await seminarModels.findOneAndDelete({ _id: id });

    if (!Seminar) {
      return res.status(404).json({
        message: "No such Seminar",
      });
    }

    return res.status(200).json(Seminar);
  } catch {
    return res.status(500).json({ error: "Server Error!" });
  }
};
