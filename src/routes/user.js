const express = require('express')
const router = express.Router()
const userControllers= require('../controllers/user');
const requireAuth = require('../middlewares/userAuth');
const requireAdmin = require('../middlewares/adminAuth');

router.post('/signUp', userControllers.postUser)

router.post('/signIn', userControllers.getUser)

router.post('/verify', userControllers.verifyuser)

router.post('/signOut', userControllers.signOut)

router.post('/getNewToken', userControllers.getNewToken)


module.exports = router