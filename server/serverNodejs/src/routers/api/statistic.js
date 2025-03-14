const express = require('express');
const router = express.Router();
const StatisticsController = require('../../app/controllers/apiController/StatisticController');
const verifyRole = require('../../middlewares/verifyRoles');
const verifyJWT = require('../../middlewares/verifyJWT');
// router.get('/users', verifyRole('admin'), StatisticsController.countUser)
// router.get('/revenue', verifyJWT, verifyRole('admin'), StatisticsController.calculateRevenue)
// router.get('/products', verifyJWT, StatisticsController.countProductSales)
// router.get('/available-product', verifyJWT, verifyRole('admin'), StatisticsController.countAvailableProduct)
// router.get('/orders', verifyJWT, verifyRole('admin'), StatisticsController.countOrderQuantity)
// router.get('/brand-sold', verifyJWT, verifyRole('admin'), StatisticsController.countQuantityOfBrandSold)

router.get('/users', StatisticsController.countUser)
router.get('/revenue', StatisticsController.calculateRevenue)
router.get('/products', StatisticsController.countProductSales)
router.get('/available-product', StatisticsController.countAvailableProduct)
router.get('/orders', StatisticsController.countOrderQuantity)
router.get('/brand-sold', StatisticsController.countQuantityOfBrandSold)

module.exports = router;

