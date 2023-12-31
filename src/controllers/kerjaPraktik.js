const { default: mongoose } = require("mongoose");
const kerjaPraktikModels = require("../models/kerjaPraktikModels");

exports.postKerjaPraktik = async (req, res, next) => {
  try {
    const newKerjaPraktik = req.body;
    if (!newKerjaPraktik || Object.keys(newKerjaPraktik).length === 0) {
      return res.json({ error: "Bad request. Request body is empty." }).status(400);
      next();
    }

    const kerjapraktik = new kerjaPraktikModels(newKerjaPraktik);
    const savedKerjaPraktik = await kerjapraktik.save();
    return res.status(201).json(savedKerjaPraktik);
  } catch (error) {
    console.error("Error creating Kerja Praktik:", error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getKerjaPraktik = async (req, res, next) => {
  const filter = req.body;
  try {
    const kerjaPraktik = await kerjaPraktikModels.find(filter);
    if (!kerjaPraktik || kerjaPraktik.length === 0) {
      return res.status(404).json({
        message: "No Kerja Praktik Found",
      });
    }

    return res.status(200).json(kerjaPraktik);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.getKerjaPraktikByUserId = async (req, res, next) => {
  const {id} = req.params; 
  try {
      
      const kerjaPraktik = await kerjaPraktikModels.find({
          user_id: id,
      });

      if (!kerjaPraktik || kerjaPraktik.length === 0) {
          return res.status(404).json({
              message: "No KerjaPraktik Found for the User",
          });
      }

      res.status(200).json(kerjaPraktik);
      next();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error!" });
      next(error);
  }
};


exports.getKerjaPraktikById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const kerjaPraktik = await kerjaPraktikModels.findById(id);
    if (!kerjaPraktik || kerjaPraktik.length === 0) {
      return res.status(404).json({
        message: "No Kerja Praktik Found",
      });
    }

    return res.status(200).json(kerjaPraktik);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.patchKerjaPraktik = async (req, res, next) => {
  try {
    const { id } = req.params;

    //cek valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "No such Missions " + id,
      });
    }
    const kerjaPraktikToUpdate = await kerjaPraktikModels.findById(id);

    // Check if the Kerja Praktik exists in the database
    if (!kerjaPraktikToUpdate) {
      return res.json({ error: "Kerja Praktik not found." }).status(404);
    }

    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.json({ error: "Bad request. Request body is empty." }).status(400);
    }

    // Update the kerja praktik document with the new data

    if (updatedData.image) {
      kerjaPraktikToUpdate.image = updatedData.image;
    }

    if (updatedData.title) {
      kerjaPraktikToUpdate.title = updatedData.title;
    }

    if (updatedData.details) {
      kerjaPraktikToUpdate.details = updatedData.details;
    }
    if (updatedData.category) {
      kerjaPraktikToUpdate.category = updatedData.category;
    }

    const updatedKerjaPraktik = await kerjaPraktikToUpdate.save();
    return res.status(200).json(updatedKerjaPraktik);
  } catch {
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.deleteKerjaPraktik = async (req, res, next) => {
  try {
    const { id } = req.params;
    //cek valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "No such kerjaPraktiks",
      });
    }
    const kerjaPraktik = await kerjaPraktikModels.findOneAndDelete({ _id: id });
    if (!kerjaPraktik) {
      return res.status(404).json({
        message: "No such Kerja Praktik",
      });
    }
    return res.status(200).json(kerjaPraktik);
  } catch {
    return res.status(500).json({ error: "Server Error!" });
  }
};

exports.searchKerjaPraktik = async (req, res, next) =>{
  try {
    const {keyword} = req.params;

    const searchResult = await kerjaPraktikModels.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } }, // Search in 'title' field (case-insensitive)
        { details: { $regex: keyword, $options: 'i' } }, // Search in 'details' field (case-insensitive)
      ],
    })
    return res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
