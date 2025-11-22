const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const { validateAddToCart, validateUpdateCart } = require('../middleware/validation');

router.get('/', cartController.getCart);

router.post('/', validateAddToCart, cartController.addToCart);

router.put('/', validateUpdateCart, cartController.updateCartItem);

router.delete('/', cartController.removeFromCart);

router.delete('/clear', cartController.clearCart);

router.get('/summary', cartController.getCartSummary);

module.exports = router;
