const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    trim: true
  },
  tshirtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tshirt',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  thumbnailImage: {
    type: String,
    trim: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

cartSchema.index({ productId: 1 });
cartSchema.index({ tshirtId: 1 });
cartSchema.index({ addedAt: 1 });

module.exports = mongoose.model('Cart', cartSchema);
