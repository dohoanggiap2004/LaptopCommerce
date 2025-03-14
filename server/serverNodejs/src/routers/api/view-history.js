const express = require('express');
const router = express.Router();
const ViewHistoryController = require('../../app/controllers/apiController/ViewHistoryController');
const verifyRole = require('../../middlewares/verifyRoles');

router.post('/', ViewHistoryController.createNewView)
router.get('/:userId', ViewHistoryController.getViewHistoryByUserId)
// router.get('/', VoucherController.getVouchers)



module.exports = router
