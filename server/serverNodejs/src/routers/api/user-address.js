const express = require('express')
const router = express.Router()
const UserAddressController = require('../../app//controllers/apiController/UserAddressController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

// router.get('/', verifyJWT, verifyRoles('user'), UserAddressController.getUserAddresses)
router.get('/', UserAddressController.getUserAddresses)
router.get('/:userId', UserAddressController.getUserAddressByUserId)
router.post('/', UserAddressController.createUserAddress)
router.put('/', UserAddressController.updateUserAddress)
router.delete('/', UserAddressController.deleteUserAddress)

module.exports = router
