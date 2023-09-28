const express = require('express')
const router = express.Router()
const userControllers= require('../controllers/user');

router.post('/', userControllers.postUser)

router.get('/', userControllers.getUser)

router.get('/:id', userControllers.getUserById)

router.patch('/:id', userControllers.patchUser)

router.delete('/:id', userControllers.deleteUser)

module.exports = router