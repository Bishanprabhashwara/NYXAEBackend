const Cart = require('../models/Cart');

class CartRepository {
  async create(cartData) {
    try {
      const cartItem = new Cart(cartData);
      return await cartItem.save();
    } catch (error) {
      throw new Error(`Error creating cart item: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await Cart.findById(id).populate('tshirtId');
    } catch (error) {
      throw new Error(`Error finding cart item by id: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await Cart.find().sort({ addedAt: -1 }).populate('tshirtId');
    } catch (error) {
      throw new Error(`Error finding all cart items: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await Cart.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('tshirtId');
    } catch (error) {
      throw new Error(`Error updating cart item: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Cart.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting cart item: ${error.message}`);
    }
  }

  async clear() {
    try {
      return await Cart.deleteMany({});
    } catch (error) {
      throw new Error(`Error clearing cart: ${error.message}`);
    }
  }

  async findByProductId(productId) {
    try {
      return await Cart.findOne({ productId }).populate('tshirtId');
    } catch (error) {
      throw new Error(`Error finding cart item by productId: ${error.message}`);
    }
  }

  async findByTshirtId(tshirtId) {
    try {
      return await Cart.findOne({ tshirtId }).populate('tshirtId');
    } catch (error) {
      throw new Error(`Error finding cart item by tshirtId: ${error.message}`);
    }
  }

  async findByTshirtIdAndSizeAndColor(tshirtId, size, color) {
    try {
      return await Cart.findOne({ tshirtId, size, color }).populate('tshirtId');
    } catch (error) {
      throw new Error(`Error finding cart item by tshirtId, size, and color: ${error.message}`);
    }
  }

  async getCartSummary() {
    try {
      const items = await Cart.find().populate('tshirtId');
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        totalItems,
        totalPrice: Math.round(totalPrice * 100) / 100 // Round to 2 decimal places
      };
    } catch (error) {
      throw new Error(`Error calculating cart summary: ${error.message}`);
    }
  }
}

module.exports = new CartRepository();
