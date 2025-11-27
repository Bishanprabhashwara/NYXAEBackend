const orderService = require('../services/OrderService');

class OrderController {
    async createOrder(req, res) {
        try {
            const result = await orderService.createOrder(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.getOrderById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllOrders(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder || 'desc';

            const result = await orderService.getAllOrders(page, limit, sortBy, sortOrder);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOrdersByEmail(req, res) {
        try {
            const { email } = req.params;
            const result = await orderService.getOrdersByEmail(email);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getOrdersByWhatsApp(req, res) {
        try {
            const { whatsapp } = req.params;
            const result = await orderService.getOrdersByWhatsApp(whatsapp);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.updateOrder(id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.updateOrderStatus(id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.deleteOrder(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async markOrderCompleted(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.markOrderCompleted(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new OrderController();
