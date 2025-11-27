const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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
        min: 1
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
    isconfirmed: {
        type: Boolean,
        default: false
    },
    ispacked: {
        type: Boolean,
        default: false
    },
    isdilivered: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    whatsapp: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: {
            validator: function (items) {
                return items && items.length > 0;
            },
            message: 'Order must have at least one item'
        }
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    tax: {
        type: Number,
        required: true,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    isOrderConfirmed: {
        type: Boolean,
        default: false
    },
    isOrderPacking: {
        type: Boolean,
        default: false
    },
    isOrderDelivered: {
        type: Boolean,
        default: false
    },
    isOrderCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

orderSchema.index({ email: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ isOrderConfirmed: 1, isOrderPacking: 1, isOrderDelivered: 1 });

module.exports = mongoose.model('Order', orderSchema);
