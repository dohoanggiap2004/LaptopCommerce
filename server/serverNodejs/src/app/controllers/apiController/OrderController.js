const { createOrderService, trackingOrderByUserIdService } = require('../../../services/apiService/orderService')

class OrderController{

    async createOrder(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({ message: "Order information is required" });

            const {orderInfo, productsInfo} = req.body
            console.log('check orderinfo', orderInfo)
            console.log('check productInfo', productsInfo)

            const newOrder = await createOrderService(orderInfo, productsInfo);

            res.status(201).json({
                newOrder: newOrder,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async trackingOrderByUserId(req, res) {
        try {
            if (!req?.params)
                return res.status(400).json({ message: "user information is required" });
            console.log('check user id', req.params)
            const userId = req.params.userId

            const ordersInfo = await trackingOrderByUserIdService( userId );

            res.status(201).json({
                ordersInfo: ordersInfo,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = new OrderController();
