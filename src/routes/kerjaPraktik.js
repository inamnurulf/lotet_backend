const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const kerjaPraktikControllers= require('../controllers/kerjaPraktik');

router.post('/', kerjaPraktikControllers.postKerjaPraktik)

router.get('/', kerjaPraktikControllers.getKerjaPraktik)

router.get('/:id', kerjaPraktikControllers.getKerjaPraktikById)

router.get('/search/byUserID/:id', kerjaPraktikControllers.getKerjaPraktikByUserId)

router.patch('/:id', kerjaPraktikControllers.patchKerjaPraktik)

router.delete('/:id', kerjaPraktikControllers.deleteKerjaPraktik)


module.exports = router