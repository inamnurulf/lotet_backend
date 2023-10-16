const express = require('express')
const router = express.Router()
const userControllers= require('../controllers/user');
const requireAuth = require('../middlewares/userAuth');
const requireAdmin = require('../middlewares/adminAuth');

router.post('/signUp', userControllers.postUser)

router.get('/signIn', userControllers.getUser)

module.exports = router