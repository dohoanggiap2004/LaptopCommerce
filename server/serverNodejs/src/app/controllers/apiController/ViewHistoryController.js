const {
    createNewViewService
} = require('../../../services/apiService/viewService')
const ViewHistory = require('../../models/View_History')
const {Laptop} = require("../../models");

class ViewHistoryController {

    async createNewView(req, res) {
        try {
            if (!req?.body) {
                return res.status(400).send({message: "View info is required"});
            }

            const view = req.body;

            // Kiểm tra nếu đã tồn tại
            const existingView = await ViewHistory.findOne({
                where: {
                    userId: view.userId,
                    laptopId: view.laptopId,
                },
            });

            if (existingView) {
                // Xóa bản ghi nếu tồn tại
                await existingView.destroy();
            }

            // Tạo bản ghi mới
            const newView = await createNewViewService(view);

            res.status(201).json({
                newView: newView,
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({error: e});
        }
    }


    async getViewHistoryByUserId(req, res) {
        try {
            const viewHistory = await ViewHistory.findAll({
                where: {
                    userId: req.params.userId,
                },
                attributes: ['laptopId'],
                limit: 10,
                order: [['createdAt', 'DESC']],
            });


            // Lấy danh sách laptopId từ viewHistory
            const laptopIds = viewHistory.map(item => item.laptopId);

            // Lặp qua danh sách laptopId để lấy thông tin laptop
            const laptops = await Laptop.findAll({
                where: {
                    laptopId: laptopIds
                }
            });

            res.status(200).json({data: laptops});
        } catch (error) {
            console.error('Error indexing laptops:', error);
            res.status(500).json({message: 'Failed to index laptops', error});
        }
    }

}

module.exports = new ViewHistoryController()
