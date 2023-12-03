const express = require('express');
const customApi= require('../controllers/customApi');

const router = express.Router()


router.get('/carousell', customApi.getNewCarousell)


module.exports = router