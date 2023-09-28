const express = require('express')
const router = express.Router()
const seminar = require('../models/seminarModels')
const seminarControllers = require('../controllers/seminar');

// code here

router.post('/', seminarControllers.postSeminar)

router.get('/', seminarControllers.getSeminar)

router.get('/search/byDate', seminarControllers.getSeminarByDate)

router.get('/:id', seminarControllers.getSeminarById)

router.patch('/:id', seminarControllers.patchSeminar)

router.delete('/:id', seminarControllers.deleteSeminar)

// Create
// Read one
// Read All
// Read by date
// Read by location
// Update
// Delete

module.exports = router