const tshirtRepository = require('../repositories/TshirtRepository');

class TshirtService {
  async generateProductId() {
    try {
      const lastTshirt = await tshirtRepository.findLastTshirt();
      let nextNumber = 1;
      
      if (lastTshirt && lastTshirt.productId) {
        const lastNumber = parseInt(lastTshirt.productId.replace('TSH', ''));
        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }
      
      return `TSH${nextNumber.toString().padStart(3, '0')}`;
    } catch (error) {
      console.error('Error generating product ID:', error);
      return 'TSH001';
    }
  }

  async createTshirt(tshirtData) {
    try {
      if (!tshirtData.productId) {
        tshirtData.productId = await this.generateProductId();
      } else {
        const existingTshirt = await tshirtRepository.findByProductId(tshirtData.productId);
        if (existingTshirt) {
          throw new Error('T-shirt with this productId already exists');
        }
      }

      if (tshirtData.quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }

      if (tshirtData.price < 0) {
        throw new Error('Price cannot be negative');
      }

      const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
      if (tshirtData.sizes.some(size => !validSizes.includes(size))) {
        throw new Error('Invalid size provided');
      }

      return await tshirtRepository.create(tshirtData);
    } catch (error) {
      throw error;
    }
  }

  async getTshirtById(id) {
    try {
      const tshirt = await tshirtRepository.findById(id);
      if (!tshirt) {
        throw new Error('T-shirt not found');
      }
      return tshirt;
    } catch (error) {
      throw error;
    }
  }

  async getTshirtByProductId(productId) {
    try {
      const tshirt = await tshirtRepository.findByProductId(productId);
      if (!tshirt) {
        throw new Error('T-shirt not found');
      }
      return tshirt;
    } catch (error) {
      throw error;
    }
  }

  async getAllTshirts(page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
    try {
      if (page < 1) page = 1;
      if (limit < 1 || limit > 100) limit = 10;
      
      const validSortFields = ['createdAt', 'updatedAt', 'name', 'price', 'quantity'];
      if (!validSortFields.includes(sortBy)) {
        sortBy = 'createdAt';
      }

      return await tshirtRepository.findAll(page, limit, sortBy, sortOrder);
    } catch (error) {
      throw error;
    }
  }

  async updateTshirt(id, updateData) {
    try {
      const existingTshirt = await tshirtRepository.findById(id);
      if (!existingTshirt) {
        throw new Error('T-shirt not found');
      }

      if (updateData.productId) {
        const tshirtWithSameProductId = await tshirtRepository.findByProductId(updateData.productId);
        if (tshirtWithSameProductId && tshirtWithSameProductId._id.toString() !== id) {
          throw new Error('Another t-shirt with this productId already exists');
        }
      }

      if (updateData.quantity !== undefined && updateData.quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }

      if (updateData.price !== undefined && updateData.price < 0) {
        throw new Error('Price cannot be negative');
      }

      if (updateData.sizes) {
        const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
        if (updateData.sizes.some(size => !validSizes.includes(size))) {
          throw new Error('Invalid size provided');
        }
      }

      return await tshirtRepository.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteTshirt(id) {
    try {
      const tshirt = await tshirtRepository.findById(id);
      if (!tshirt) {
        throw new Error('T-shirt not found');
      }

      return await tshirtRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async searchTshirts(query) {
    try {
      if (!query || query.trim().length < 2) {
        throw new Error('Search query must be at least 2 characters long');
      }

      return await tshirtRepository.search(query.trim());
    } catch (error) {
      throw error;
    }
  }

  async getTshirtsBySize(size) {
    try {
      const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
      if (!validSizes.includes(size)) {
        throw new Error('Invalid size');
      }

      return await tshirtRepository.findBySize(size);
    } catch (error) {
      throw error;
    }
  }

  async getTshirtsByColor(color) {
    try {
      if (!color || color.trim().length === 0) {
        throw new Error('Color cannot be empty');
      }

      return await tshirtRepository.findByColor(color.trim());
    } catch (error) {
      throw error;
    }
  }

  async getTshirtsByPriceRange(minPrice, maxPrice) {
    try {
      if (minPrice < 0 || maxPrice < 0) {
        throw new Error('Prices cannot be negative');
      }

      if (minPrice > maxPrice) {
        throw new Error('Minimum price cannot be greater than maximum price');
      }

      return await tshirtRepository.findByPriceRange(minPrice, maxPrice);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TshirtService();
