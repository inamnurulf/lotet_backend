const express = require('express')
const router = express.Router()
const kerjaPraktikControllers= require('../controllers/kerjaPraktik');

router.post('/', kerjaPraktikControllers.postKerjaPraktik)

router.get('/', kerjaPraktikControllers.getKerjaPraktik)


router.patch('/:id', kerjaPraktikControllers.patchKerjaPraktik)

router.delete('/:id', kerjaPraktikControllers.deleteKerjaPraktik)


module.exports = router