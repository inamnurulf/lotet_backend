const { default: mongoose } = require('mongoose');
const kerjaPraktikModels = require('../models/kerjaPraktikModels')

exports.postSeminar = async (req, res, next) => {
    try {
        const newSeminar = req.body
        if (!newSeminar || Object.keys(newKerjaPraktik).length === 0) {
            res.json({ error: 'Bad request. Request body is empty.' }).status(400);
            next()
        }

        const seminar = new seminarModels(
            newSeminar
        )
        const savedSeminar = await seminar.save()
        res.status(201).json(savedSeminar)
        next()
    } catch (error) {
        console.error('Error creating Seminar:', error);
        res.status(500).json({ error: 'Server Error!' });
        next()
    } }

    exports.getSeminar = async (req, res, next) => {
        try {
            const Seminar = await seminarModels.find();
            if (!Seminar || Seminar.length === 0) {
                return res.status(404).json({
                    message: "No Seminar Found"
                })
            }

            res.status(200).json(Seminar);
            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server Error!" });
            next(error);

        }

    }

    exports.getSeminarById = async (req, res, next) => {
        const { id } = req.params
        try {
            const Seminar = await seminarModels.findById(id);
            if (!Seminar || Seminar.length === 0) {
                return res.status(404).json({
                    message: "No Seminar Found"
                })
            }

            res.status(200).json(Seminar);
            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server Error!" });
            next(error);

        }
    }

    exports.patchSeminar = async (req, res, next) => {
        try {

            const { id } = req.params;

            //cek valid ID 
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(404).json({
                    message: "No such Missions " + id
                }
                )
                next()
            }
            const SeminarToUpdate = await seminarModels.findById(id);

            // Check if the Seeker exists in the database
            if (!SeminarToUpdate) {
                res.json({ error: 'Seminar not found.' }).status(404);
                next()
            }

            const updatedData = req.body
            if (!updatedData || Object.keys(updatedData).length === 0) {
                res.json({ error: 'Bad request. Request body is empty.' }).status(400);
                next()
            }

            // Update the seminar document with the new data

            if (updatedData.details) {
                seminarToUpdate.details = updatedData.details;
            }

            if (updatedData.image) {
                seminarToUpdate.image = updatedData.image;
            }

            if (updatedData.category) {
                seminarToUpdate.category = updatedData.category;
            }

            const updatedSeminar = await seminarToUpdate.save();
            res.status(200).json(updatedSeminar)
            next();
        } catch {
            res.status(500).json({ error: "Server Error!" })
            next();
        }

    }

    exports.deleteSeminar = async (req, res, next) => {
        try {
            const { id } = req.params;

            //cek valid ID 
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({
                    message: "No such Seminar"
                })
            }

            const Seminar = await seminarModels.findOneAndDelete({ _id: id })

            if (!Seminar) {
                res.status(404).json({
                    message: "No such Seminar"
                })
            }

            res.status(200).jso(Seminar)
            next();
        } catch {
            res.status(500).json({ error: "Server Error!" })
            next();
        }
    }