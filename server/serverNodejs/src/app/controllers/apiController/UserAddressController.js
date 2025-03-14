const {
  getUserAddressesService,
  getUserAddressByIdService,
  createUserAddressService,
  updateUserAddressService,
  deleteUserAddressService,
} = require("../../../services/apiService/userAddressService");
class UserAddressController {
  async getUserAddresses(req, res) {
    try {
      const userAddress = await getUserAddressesService();

      if (!userAddress) {
        return res.status(200).json({ message: "UserAddress not found" });
      }

      res.status(200).json({
        data: userAddress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserAddressByUserId(req, res) {
    try {
      if (!req?.params?.userId)
        return res.status(400).json({ message: "UserAddress id is required" });

      const id = req.params.userId;
      const userAddress = await getUserAddressByIdService(id);

      if (!userAddress) {
        return res.status(200).json({ message: "UserAddress not found" });
      }

      res.status(200).json({
        data: userAddress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUserAddress(req, res) {
    try {
      if (!req?.body)
        return res.status(400).json({ message: "UserAddress information is required" });

      const userAddress = req.body;
      const newUserAddress = await createUserAddressService(userAddress);

      res.status(201).json({
        newUserAddress: newUserAddress,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUserAddress(req, res) {
    try {
      if (!req?.body)
       return res.status(400).json({ message: "UserAddress information is required" });

      const userAddress = req.body;
      const [result] = await updateUserAddressService(userAddress);
    //   console.log(result)
      if (result === 0) return res.status(200).json({ message: "No userAddress changed" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteUserAddress(req, res) {
    try {
      if (!req?.body)
        return res.status(400).json({ message: "UserAddress information is required" });

      const id = req.body.id;
      const result = await deleteUserAddressService(id);
      if (result === 0) return res.status(200).json({ message: "No userAddress be deleted" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new UserAddressController();
