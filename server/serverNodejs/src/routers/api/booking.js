const express = require('express')
const router = express.Router()
const BookingController = require('../../app//controllers/apiController/BookingController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

// router.get('/', verifyJWT, verifyRoles('user'), BrandController.getBrands)
router.get('/slots/:date', BookingController.getSlots)
router.post('/', BookingController.bookSlot)

module.exports = router
