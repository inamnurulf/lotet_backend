const { default: mongoose } = require('mongoose');
const seminarModels = require('../models/seminarModels')

exports.postSeminar = async (req, res, next) => {
    try{
        const newSeminar = req.body
        if(!newSeminar || Object.keys(newSeminar).length === 0){
            res.json({error: 'Bad request. Request body is empty.'}).status(400);
            next()
        }
        const seminar = new seminarModels(newSeminar)
        const savedSeminar = await seminar.save()
        res.status(201).json(savedSeminar)
        next()

    } catch (error){
        console.error('Error creating Kerja Praktik:', error);
        res.status(500).json({ error: 'Server Error!' });
        next()    
    }

}

exports.getSeminarById = async (req, res, next) => {
    const {id} = req.params
    try{
        const seminar = await seminarModels.findById(id);
        if(!seminar || seminar.length === 0){
            return res.status(404).json({
                message: "No Seminar found"
            })
        }
        
        res.status(200).json(seminar);
        next();

    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Server Error!" });
        next(error);
    }
}

exports.getSeminar = async (req, res, next) => {
    try{
        const seminar = await seminarModels.find();
        if(!seminar|| seminar.length === 0 ){
            return res.status(404).json({
                message: "No Seminar Found"
            })
        }

        res.status(200).json(seminar);
        next();

    }catch (error){
        console.error(error);
        res.status(500).json({ error: "Server Error!" });
        next(error);
    }
}