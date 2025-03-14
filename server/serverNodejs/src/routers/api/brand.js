const express = require('express')
const router = express.Router()
const BrandController = require('../../app//controllers/apiController/BrandController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

// router.get('/', verifyJWT, verifyRoles('user'), BrandController.getBrands)
router.get('/', BrandController.getBrands)
router.get('/:brandId', BrandController.getBrandById)
router.post('/', BrandController.createBrand)
router.put('/', BrandController.updateBrand)
router.delete('/', BrandController.deleteBrand)

module.exports = router
