
const { User_Address } = require("../../app/models");
const getUserAddressesService = async () => {
  return await User_Address.findAll();
};

const getUserAddressByIdService = async (userId) => {
  return await User_Address.findAll({
      where: {
          userId: userId
      }
  });
};

const createUserAddressService = async (address) => {
  return await User_Address.create(address);
};
const updateUserAddressService = async (address) => {
    const { addressId, ...updateFields } = address;

    return await User_Address.update(updateFields, {
      where: {
        addressId: addressId
      }
    });
};

const deleteUserAddressService = async (id) => {
  return await User_Address.destroy({
    where: {
        addressId: id
    }
  });
};

module.exports = { getUserAddressesService, getUserAddressByIdService, createUserAddressService, updateUserAddressService, deleteUserAddressService, };
