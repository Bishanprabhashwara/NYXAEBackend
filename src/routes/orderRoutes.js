const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { validateCreateOrder, validateUpdateOrderStatus, validateId } = require('../middleware/validation');

router.post('/', validateCreateOrder, orderController.createOrder);

router.get('/', orderController.getAllOrders);

router.get('/:id', validateId, orderController.getOrderById);

router.get('/email/:email', orderController.getOrdersByEmail);

router.get('/whatsapp/:whatsapp', orderController.getOrdersByWhatsApp);

router.put('/:id', validateId, orderController.updateOrder);

router.patch('/:id/status', validateId, validateUpdateOrderStatus, orderController.updateOrderStatus);

router.delete('/:id', validateId, orderController.deleteOrder);

router.patch('/:id/complete', validateId, orderController.markOrderCompleted);

module.exports = router;
