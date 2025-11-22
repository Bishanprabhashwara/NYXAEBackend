const Tshirt = require('../models/Tshirt');

class TshirtRepository {
  async create(tshirtData) {
    try {
      const tshirt = new Tshirt(tshirtData);
      return await tshirt.save();
    } catch (error) {
      throw new Error(`Error creating tshirt: ${error.message}`);
    }
  }

  async findLastTshirt() {
    try {
      return await Tshirt.findOne().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error finding last tshirt: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await Tshirt.findById(id);
    } catch (error) {
      throw new Error(`Error finding tshirt by id: ${error.message}`);
    }
  }

  async findByProductId(productId) {
    try {
      return await Tshirt.findOne({ productId });
    } catch (error) {
      throw new Error(`Error finding tshirt by productId: ${error.message}`);
    }
  }

  async findAll(page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
    try {
      const skip = (page - 1) * limit;
      const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
      
      const tshirts = await Tshirt.find()
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
      
      const total = await Tshirt.countDocuments();
      
      return {
        tshirts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error finding all tshirts: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await Tshirt.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } catch (error) {
      throw new Error(`Error updating tshirt: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Tshirt.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting tshirt: ${error.message}`);
    }
  }

  async search(query) {
    try {
      const searchRegex = new RegExp(query, 'i');
      return await Tshirt.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { productId: searchRegex }
        ]
      });
    } catch (error) {
      throw new Error(`Error searching tshirts: ${error.message}`);
    }
  }

  async findBySize(size) {
    try {
      return await Tshirt.find({ sizes: size });
    } catch (error) {
      throw new Error(`Error finding tshirts by size: ${error.message}`);
    }
  }

  async findByColor(color) {
    try {
      return await Tshirt.find({ colors: color });
    } catch (error) {
      throw new Error(`Error finding tshirts by color: ${error.message}`);
    }
  }

  async findByPriceRange(minPrice, maxPrice) {
    try {
      return await Tshirt.find({
        price: { $gte: minPrice, $lte: maxPrice }
      });
    } catch (error) {
      throw new Error(`Error finding tshirts by price range: ${error.message}`);
    }
  }
}

module.exports = new TshirtRepository();
