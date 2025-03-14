const {
    getLaptopsService,
    getAllLaptopsService,
    countQuantityLaptopsService,
    getLaptopByIdService,
    createLaptopService,
    updateLaptopService,
    deleteLaptopService,
    searchLaptopByModelService,
} = require("../../../services/apiService/laptopService");
const {parse} = require("uuid");

class LaptopController {
    async getLaptops(req, res) {
        try {
            if (!req?.query.page || !req?.query.limit) {
                const laptops = await getAllLaptopsService();
                return res.status(200).json({
                    data: laptops,
                });
            }
            const {page, limit} = req.query;
            const pageNumber = Number(page); // Chuyển 'page' thành số nguyên
            const limitNumber = Number(limit); // Chuyển 'limit' thành số nguyên
            const offset = (
                pageNumber - 1
            ) * limitNumber;

            const products = await getLaptopsService(limitNumber, offset);
            const totalProducts = await countQuantityLaptopsService();
            const totalPage = Math.ceil(totalProducts / limit)
            if (!products) {
                return res.status(200).json({message: "products not found"});
            }

            res.status(200).json({
                totalProducts: totalProducts,
                totalPage: totalPage,
                currentPage: page,
                data: products,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async getLaptopById(req, res) {
        try {
            if (!req?.params?.laptopId)
                return res.status(400).json({message: "Laptop id is required"});

            const id = req.params.laptopId;
            const laptop = await getLaptopByIdService(id);

            if (!laptop) {
                return res.status(200).json({message: "Laptop not found"});
            }

            res.status(200).json({
                data: laptop,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async searchLaptopByModel(req, res) {
        try {
            if (!req?.query)
                return res.status(400).json({message: "Laptop model is required"});
            console.log(req.query);
            const { model } = req.query;
            const laptops = await searchLaptopByModelService(model);

            if (!laptops) {
                return res.status(200).json({message: "Laptop not found"});
            }

            res.status(200).json({
                data: laptops,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async createLaptop(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({message: "Laptop information is required"});

            const laptop = req.body;
            const newLaptop = await createLaptopService(laptop);

            res.status(201).json({
                newLaptop: newLaptop,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async updateLaptop(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({message: "Laptop information is required"});

            const laptop = req.body;
            const [result] = await updateLaptopService(laptop);
            //   console.log(result)
            if (result === 0) return res.status(200).json({message: "No laptop changed"});

            res.status(200).json({
                rowsEffected: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async deleteLaptop(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({message: "Laptop information is required"});

            const id = req.body.id;
            const result = await deleteLaptopService(id);
            if (result === 0) return res.status(200).json({message: "No laptop be deleted"});

            res.status(200).json({
                rowsEffected: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = new LaptopController();
