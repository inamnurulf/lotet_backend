const { default: mongoose } = require('mongoose');
const UserModels = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALTROUNDS, 10);


exports.postUser = async (req, res, next) => {
    try {
        const newUser = req.body
        if(!newUser || Object.keys(newUser).length === 0){
            res.json({ error: 'Bad request. Request body is empty.' }).status(400);
            next()
        }
        const existingUser = await UserModels.findOne({ $or: [{ nim: newUser.nim }, { email: newUser.email }] });
        if (existingUser) {
            res.status(400).json({ error: 'User with the same nim or email already exists.' });
            return next();
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newUser.password, salt)
        const User = new UserModels({
          name: newUser.name,
          email: newUser.email,
          password: hashedPassword,
          nim: newUser.nim,
        })
        const savedUser = await User.save()
        res.status(201).json(savedUser)
        next()
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'Server Error!' });
        next()
    }
}

exports.getUser = async (req, res, next) => {
    const filter = req.body
    try {
        const User = await UserModels.find(filter);
        if(!User || User.length === 0){
            return res.status(404).json({
                message: "No Kerja Praktik Found"
            })
        }

        res.status(200).json(User);
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error!" });
        next(error);
        
    }

}