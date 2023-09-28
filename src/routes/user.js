const express = require('express')
const router = express.Router()
const userControllers= require('../controllers/user');

router.post('/signUp', userControllers.postUser)

router.get('/signIn', userControllers.getUser)

module.exports = router