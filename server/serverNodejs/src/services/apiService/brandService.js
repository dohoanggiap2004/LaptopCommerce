
const { Brand } = require("../../app/models");
const getBrandsService = async () => {
  return await Brand.findAll();
};

const getBrandByIdService = async (brandId) => {
  return await Brand.findByPk(brandId);
};

const createBrandService = async (brand) => {
  return await Brand.create(brand);
};
const updateBrandService = async (brand) => {
    const { brandId, ...updateFields } = brand;

    return await Brand.update(updateFields, {
      where: {
        brandId: brandId
      }
    });
};

const deleteBrandService = async (id) => {
  return await Brand.destroy({
    where: {
        brandId: id
    }
  });
};

module.exports = { getBrandsService, getBrandByIdService, createBrandService, updateBrandService, deleteBrandService, };
