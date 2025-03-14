const express = require('express')
const router = express.Router()
const InstallmentController = require('../../app//controllers/apiController/InstallmentController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

// router.get('/', verifyJWT, verifyRoles('user'), InstallmentController.getInstallments)
router.get('/', InstallmentController.getInstallments)
router.get('/filter', InstallmentController.getFilterInstallments)
router.get('/:installmentId', InstallmentController.getInstallmentById)
router.get('/recommended/:laptopId', InstallmentController.getRecommendedInstallments)
router.post('/', InstallmentController.createInstallment)
router.put('/', InstallmentController.updateInstallment)
router.delete('/', InstallmentController.deleteInstallment)

module.exports = router
