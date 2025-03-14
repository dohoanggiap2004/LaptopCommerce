const {Laptop} = require("../../app/models");
const {Op} = require("sequelize");
const getAllLaptopsService = async () => {
    return await Laptop.findAll();
};

const getLaptopsService = async (limit, offset) => {
    return await Laptop.findAll({
        offset: offset,
        limit: limit,
    })
}

const searchLaptopByModelService = async (model) => {
    return await Laptop.findAll({
        where: {
            model: {
                [Op.like]: `%${model}%`,
            },
        }
    })
}

const countQuantityLaptopsService = async () => {
    return await Laptop.count();
}

const getLaptopByIdService = async (laptopId) => {
    return await Laptop.findByPk(laptopId);
};

const createLaptopService = async (laptop) => {
    return await Laptop.create(laptop);
};
const updateLaptopService = async (laptop) => {
    const {laptopId, ...updateFields} = laptop;

    return await Laptop.update(updateFields, {
        where: {
            laptopId: laptopId
        }
    });
};

const deleteLaptopService = async (id) => {
    return await Laptop.destroy({
        where: {
            laptopId: id
        }
    });
};

module.exports = {
    getLaptopsService,
    getAllLaptopsService,
    countQuantityLaptopsService,
    getLaptopByIdService,
    createLaptopService,
    updateLaptopService,
    deleteLaptopService,
    searchLaptopByModelService
};
