const Order = require('../models/Order');

class OrderRepository {
    async create(orderData) {
        try {
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Order.findById(id).populate('items.tshirtId');
        } catch (error) {
            throw new Error(`Error finding order by id: ${error.message}`);
        }
    }

    async findAll(page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') {
        try {
            const skip = (page - 1) * limit;
            const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

            const orders = await Order.find()
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate('items.tshirtId');

            const total = await Order.countDocuments();

            return {
                orders,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalOrders: total,
                    ordersPerPage: limit
                }
            };
        } catch (error) {
            throw new Error(`Error finding all orders: ${error.message}`);
        }
    }

    async findByEmail(email) {
        try {
            return await Order.find({ email }).sort({ createdAt: -1 }).populate('items.tshirtId');
        } catch (error) {
            throw new Error(`Error finding orders by email: ${error.message}`);
        }
    }

    async findByWhatsApp(whatsapp) {
        try {
            return await Order.find({ whatsapp }).sort({ createdAt: -1 }).populate('items.tshirtId');
        } catch (error) {
            throw new Error(`Error finding orders by whatsapp: ${error.message}`);
        }
    }

    async update(id, updateData) {
        try {
            return await Order.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('items.tshirtId');
        } catch (error) {
            throw new Error(`Error updating order: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await Order.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting order: ${error.message}`);
        }
    }

    async updateOrderStatus(id, statusUpdate) {
        try {
            return await Order.findByIdAndUpdate(id, statusUpdate, { new: true, runValidators: true }).populate('items.tshirtId');
        } catch (error) {
            throw new Error(`Error updating order status: ${error.message}`);
        }
    }

    async markOrderCompleted(id) {
        try {
            return await Order.findByIdAndUpdate(
                id, 
                { isOrderCompleted: true }, 
                { new: true, runValidators: true }
            ).populate('items.tshirtId');
        } catch (error) {
            throw new Error(`Error marking order as completed: ${error.message}`);
        }
    }
}

module.exports = new OrderRepository();
