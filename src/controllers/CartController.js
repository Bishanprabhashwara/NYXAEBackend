const cartService = require('../services/CartService');

class CartController {
  async getCart(req, res) {
    try {
      const result = await cartService.getCart();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async addToCart(req, res) {
    try {
      const result = await cartService.addToCart(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateCartItem(req, res) {
    try {
      const { itemId, quantity } = req.body;
      const result = await cartService.updateCartItem(itemId, quantity);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async removeFromCart(req, res) {
    try {
      const { itemId } = req.query;
      const result = await cartService.removeFromCart(itemId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async clearCart(req, res) {
    try {
      const result = await cartService.clearCart();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getCartSummary(req, res) {
    try {
      const result = await cartService.getCartSummary();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new CartController();
