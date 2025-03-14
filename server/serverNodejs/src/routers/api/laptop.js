const express = require('express')
const router = express.Router()
const LaptopController = require('../../app//controllers/apiController/LaptopController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

// router.get('/', verifyJWT, verifyRoles('user'), LaptopController.getLaptops)
router.get('/search', LaptopController.searchLaptopByModel)
router.get('/', LaptopController.getLaptops)
router.get('/:laptopId', LaptopController.getLaptopById)
router.post('/', LaptopController.createLaptop)
router.put('/', LaptopController.updateLaptop)
router.delete('/', LaptopController.deleteLaptop)

module.exports = router
