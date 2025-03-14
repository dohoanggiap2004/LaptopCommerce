const {
  getBrandsService,
  getBrandByIdService,
  createBrandService,
  updateBrandService,
  deleteBrandService,
} = require("../../../services/apiService/brandService");
class BrandController {
  async getBrands(req, res) {
    try {
      const brands = await getBrandsService();

      if (!brands) {
        return res.status(200).json({ message: "Brand not found" });
      }

      res.status(200).json({
        data: brands,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getBrandById(req, res) {
    try {
      if (!req?.params?.brandId)
        return res.status(400).json({ message: "Brand id is required" });

      const id = req.params.brandId;
      const brand = await getBrandByIdService(id);

      if (!brand) {
        return res.status(200).json({ message: "Brand not found" });
      }

      res.status(200).json({
        data: brand,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createBrand(req, res) {
    try {
      if (!req?.body)
        return res.status(400).json({ message: "Brand information is required" });

      const brand = req.body;
      const newBrand = await createBrandService(brand);

      res.status(201).json({
        newBrand: newBrand,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateBrand(req, res) {
    try {
      if (!req?.body)
       return res.status(400).json({ message: "Brand information is required" });

      const brand = req.body;
      const [result] = await updateBrandService(brand);
    //   console.log(result)
      if (result === 0) return res.status(200).json({ message: "No brand changed" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteBrand(req, res) {
    try {
      if (!req?.body)
        return res.status(400).json({ message: "Brand information is required" });

      const id = req.body.id;
      const result = await deleteBrandService(id);
      if (result === 0) return res.status(200).json({ message: "No brand be deleted" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new BrandController();
