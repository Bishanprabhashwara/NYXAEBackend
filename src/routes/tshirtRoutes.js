const express = require('express');
const router = express.Router();
const tshirtController = require('../controllers/TshirtController');
const { validateTshirt, validateUpdateTshirt, validateId } = require('../middleware/validation');

router.post('/', validateTshirt, tshirtController.createTshirt);

router.get('/', tshirtController.getAllTshirts);

router.get('/search', tshirtController.searchTshirts);

router.get('/size/:size', tshirtController.getTshirtsBySize);

router.get('/color/:color', tshirtController.getTshirtsByColor);

router.get('/price-range', tshirtController.getTshirtsByPriceRange);

router.get('/product/:productId', tshirtController.getTshirtByProductId);

router.get('/:id', validateId, tshirtController.getTshirtById);

router.put('/:id', validateId, validateUpdateTshirt, tshirtController.updateTshirt);

router.delete('/:id', validateId, tshirtController.deleteTshirt);

module.exports = router;
