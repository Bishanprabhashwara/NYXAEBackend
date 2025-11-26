const orderRepository = require('../repositories/OrderRepository');

class OrderService {
    async createOrder(orderData) {
        try {
            const newOrder = await orderRepository.create(orderData);

            return {
                success: true,
                message: 'Order created successfully',
                data: newOrder
            };
        } catch (error) {
            throw error;
        }
    }

    async getOrderById(id) {
        try {
            const order = await orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }

            return {
                success: true,
                data: order
            };
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders(page, limit, sortBy, sortOrder) {
        try {
            const result = await orderRepository.findAll(page, limit, sortBy, sortOrder);

            return {
                success: true,
                data: result.orders,
                pagination: result.pagination
            };
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByEmail(email) {
        try {
            const orders = await orderRepository.findByEmail(email);

            return {
                success: true,
                data: orders
            };
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByWhatsApp(whatsapp) {
        try {
            const orders = await orderRepository.findByWhatsApp(whatsapp);

            return {
                success: true,
                data: orders
            };
        } catch (error) {
            throw error;
        }
    }

    async updateOrder(id, updateData) {
        try {
            const order = await orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }

            const updatedOrder = await orderRepository.update(id, updateData);

            return {
                success: true,
                message: 'Order updated successfully',
                data: updatedOrder
            };
        } catch (error) {
            throw error;
        }
    }

    async updateOrderStatus(id, statusUpdate) {
        try {
            const order = await orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }

            const updatedOrder = await orderRepository.updateOrderStatus(id, statusUpdate);

            return {
                success: true,
                message: 'Order status updated successfully',
                data: updatedOrder
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteOrder(id) {
        try {
            const order = await orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }

            const deletedOrder = await orderRepository.delete(id);

            return {
                success: true,
                message: 'Order deleted successfully',
                data: deletedOrder
            };
        } catch (error) {
            throw error;
        }
    }

    async markOrderCompleted(id) {
        try {
            const order = await orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }

            const completedOrder = await orderRepository.markOrderCompleted(id);

            return {
                success: true,
                message: 'Order marked as completed successfully',
                data: completedOrder
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new OrderService();
