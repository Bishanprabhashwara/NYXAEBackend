const cartRepository = require('../repositories/CartRepository');
const tshirtService = require('./TshirtService');

class CartService {
  async getCart() {
    try {
      const items = await cartRepository.findAll();
      const summary = await cartRepository.getCartSummary();
      
      return {
        success: true,
        data: items,
        summary
      };
    } catch (error) {
      throw error;
    }
  }

  async addToCart(itemData) {
    try {
      let tshirt;
      
      // Handle both tshirtId (ObjectId) and productId (string like "TSH003")
      if (itemData.tshirtId && itemData.tshirtId.toString().match(/^[0-9a-fA-F]{24}$/)) {
        // It's an ObjectId, find by _id
        tshirt = await tshirtService.getTshirtById(itemData.tshirtId);
      } else if (itemData.productId) {
        // It's a productId, find by productId
        tshirt = await tshirtService.getTshirtByProductId(itemData.productId);
        // Set the tshirtId to the actual ObjectId
        itemData.tshirtId = tshirt._id;
      } else {
        throw new Error('Either valid tshirtId (ObjectId) or productId is required');
      }
      
      // Validate size and color are available for this t-shirt
      if (!tshirt.sizes.includes(itemData.size)) {
        throw new Error(`Size ${itemData.size} is not available for this t-shirt`);
      }
      
      if (!tshirt.colors.includes(itemData.color)) {
        throw new Error(`Color ${itemData.color} is not available for this t-shirt`);
      }

      // Check if item already exists in cart with same tshirt, size, and color
      const existingItem = await cartRepository.findByTshirtIdAndSizeAndColor(
        itemData.tshirtId, 
        itemData.size, 
        itemData.color
      );

      if (existingItem) {
        // Update quantity if item exists
        const newQuantity = existingItem.quantity + itemData.quantity;
        const updatedItem = await cartRepository.update(existingItem._id, { quantity: newQuantity });
        
        return {
          success: true,
          message: 'Cart item quantity updated',
          data: updatedItem
        };
      } else {
        // Create new cart item
        const cartItem = {
          productId: itemData.productId || tshirt.productId,
          tshirtId: itemData.tshirtId,
          name: itemData.name || tshirt.name,
          price: itemData.price || tshirt.price,
          quantity: itemData.quantity,
          size: itemData.size,
          color: itemData.color,
          thumbnailImage: itemData.thumbnailImage || tshirt.thumbnailImage
        };

        const newItem = await cartRepository.create(cartItem);
        
        return {
          success: true,
          message: 'Item added to cart successfully',
          data: newItem
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCartItem(itemId, quantity) {
    try {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }

      const cartItem = await cartRepository.findById(itemId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      const updatedItem = await cartRepository.update(itemId, { quantity });
      
      return {
        success: true,
        message: 'Cart item updated successfully',
        data: updatedItem
      };
    } catch (error) {
      throw error;
    }
  }

  async removeFromCart(itemId) {
    try {
      const cartItem = await cartRepository.findById(itemId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      const deletedItem = await cartRepository.delete(itemId);
      
      return {
        success: true,
        message: 'Item removed from cart successfully',
        data: deletedItem
      };
    } catch (error) {
      throw error;
    }
  }

  async clearCart() {
    try {
      await cartRepository.clear();
      
      return {
        success: true,
        message: 'Cart cleared successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  async getCartSummary() {
    try {
      const summary = await cartRepository.getCartSummary();
      
      return {
        success: true,
        data: summary
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartService();
