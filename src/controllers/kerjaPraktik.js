const { default: mongoose } = require('mongoose');
const kerjaPraktikModels = require('../models/kerjaPraktikModels')

exports.postKerjaPraktik = async (req, res, next) => {
    try {
        const newKerjaPraktik = req.body
        if(!newKerjaPraktik || Object.keys(newKerjaPraktik).length === 0){
            res.json({ error: 'Bad request. Request body is empty.' }).status(400);
            next()
        }

        const kerjapraktik = new kerjaPraktikModels(
        newKerjaPraktik
        )
        const savedKerjaPraktik = await kerjapraktik.save()
        res.status(201).json(savedKerjaPraktik)
        next()
    } catch (error) {
        console.error('Error creating Kerja Praktik:', error);
        res.status(500).json({ error: 'Server Error!' });
        next()
    }
    

}

exports.getKerjaPraktik = async (req, res, next) => {
    const filter = req.body
    try {
        const kerjaPraktik = await kerjaPraktikModels.find(filter);
        if(!kerjaPraktik || kerjaPraktik.length === 0){
            return res.status(404).json({
                message: "No Kerja Praktik Found"
            })
        }

        res.status(200).json(kerjaPraktik);
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error!" });
        next(error);
        
    }

}

exports.getKerjaPraktikById = async(req, res, next) =>{
    const {id} = req.params
    try {
        const kerjaPraktik = await kerjaPraktikModels.findById(id);
        if(!kerjaPraktik || kerjaPraktik.length === 0){
            return res.status(404).json({
                message: "No Kerja Praktik Found"
            })
        }

        res.status(200).json(kerjaPraktik);
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error!" });
        next(error);
        
    }
}

exports.patchKerjaPraktik = async (req, res, next) => {
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
        const kerjaPraktikToUpdate = await kerjaPraktikModels.findById(id);

        // Check if the Seeker exists in the database
        if (!kerjaPraktikToUpdate) {
            res.json({ error: 'Kerja Praktik not found.' }).status(404);
            next()
        }

        const updatedData = req.body
        if (!updatedData || Object.keys(updatedData).length === 0) {
            res.json({ error: 'Bad request. Request body is empty.' }).status(400);
            next()
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
        res.status(200).json(updatedKerjaPraktik)
        next();
    } catch {
        res.status(500).json({ error: "Server Error!" })
        next();
    }

}

exports.deleteKerjaPraktik = async (req, res, next) => {
    try {
        const { id } = req.params;
        //cek valid ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "No such kerjaPraktiks"
            })
        }
        const kerjaPraktik = await kerjaPraktikModels.findOneAndDelete({ _id: id })
        if (!kerjaPraktik) {
            res.status(404).json({
                message: "No such Kerja Praktik"
            })
        }
        res.status(200).json(kerjaPraktik)
        next();
    } catch {
        res.status(500).json({ error: "Server Error!" })
        next();
    }
}