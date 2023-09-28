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
        const existingUser = await UserModels.findOne({ $or: [{ name: newUser.name }, { email: newUser.email }] });
        if (existingUser) {
            res.status(400).json({ error: 'User with the same username or email already exists.' });
            return next();
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newUser.password, salt)
        const User = new UserModels({
          name: newUser.name,
          email: newUser.email,
          password: hashedPassword,
          nim: newUser.nim,
          role: newUser.role,
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

exports.getUserById = async(req, res, next) =>{
    const {id} = req.params
    try {
        const User = await UserModels.findById(id);
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

exports.patchUser = async (req, res, next) => {
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
        const UserToUpdate = await UserModels.findById(id);

        // Check if the Seeker exists in the database
        if (!UserToUpdate) {
            res.json({ error: 'Kerja Praktik not found.' }).status(404);
            next()
        }

        const updatedData = req.body
        if (!updatedData || Object.keys(updatedData).length === 0) {
            res.json({ error: 'Bad request. Request body is empty.' }).status(400);
            next()
        }

        // Update the kerja praktik document with the new data

        if (updatedData.name) {
            UserToUpdate.name = updatedData.name;
        }

        if (updatedData.email) {
            UserToUpdate.email = updatedData.email;
        }

        if (updatedData.password) {
            UserToUpdate.password = updatedData.password;
        }
        if (updatedData.nim) {
            UserToUpdate.nim = updatedData.nim;
        }
        if (updatedData.role) {
          UserToUpdate.role = updatedData.role;
      }

        const updatedUser = await UserToUpdate.save();
        res.status(200).json(updatedUser)
        next();
    } catch {
        res.status(500).json({ error: "Server Error!" })
        next();
    }

}

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        //cek valid ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "No such Users"
            })
        }
        const User = await UserModels.findOneAndDelete({ _id: id })
        if (!User) {
            res.status(404).json({
                message: "No such Kerja Praktik"
            })
        }
        res.status(200).json(User)
        next();
    } catch {
        res.status(500).json({ error: "Server Error!" })
        next();
    }
}