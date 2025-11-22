const tshirtService = require('../services/TshirtService');

class TshirtController {
  async createTshirt(req, res) {
    try {
      const tshirt = await tshirtService.createTshirt(req.body);
      res.status(201).json({
        success: true,
        message: 'T-shirt created successfully',
        data: tshirt
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTshirtById(req, res) {
    try {
      const { id } = req.params;
      const tshirt = await tshirtService.getTshirtById(id);
      res.status(200).json({
        success: true,
        data: tshirt
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTshirtByProductId(req, res) {
    try {
      const { productId } = req.params;
      const tshirt = await tshirtService.getTshirtByProductId(productId);
      res.status(200).json({
        success: true,
        data: tshirt
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllTshirts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder || 'desc';

      const result = await tshirtService.getAllTshirts(page, limit, sortBy, sortOrder);
      res.status(200).json({
        success: true,
        data: result.tshirts,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateTshirt(req, res) {
    try {
      const { id } = req.params;
      const tshirt = await tshirtService.updateTshirt(id, req.body);
      res.status(200).json({
        success: true,
        message: 'T-shirt updated successfully',
        data: tshirt
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteTshirt(req, res) {
    try {
      const { id } = req.params;
      const tshirt = await tshirtService.deleteTshirt(id);
      res.status(200).json({
        success: true,
        message: 'T-shirt deleted successfully',
        data: tshirt
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async searchTshirts(req, res) {
    try {
      const { q } = req.query;
      const tshirts = await tshirtService.searchTshirts(q);
      res.status(200).json({
        success: true,
        data: tshirts
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTshirtsBySize(req, res) {
    try {
      const { size } = req.params;
      const tshirts = await tshirtService.getTshirtsBySize(size);
      res.status(200).json({
        success: true,
        data: tshirts
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTshirtsByColor(req, res) {
    try {
      const { color } = req.params;
      const tshirts = await tshirtService.getTshirtsByColor(color);
      res.status(200).json({
        success: true,
        data: tshirts
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getTshirtsByPriceRange(req, res) {
    try {
      const { minPrice, maxPrice } = req.query;
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      
      const tshirts = await tshirtService.getTshirtsByPriceRange(min, max);
      res.status(200).json({
        success: true,
        data: tshirts
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TshirtController();
