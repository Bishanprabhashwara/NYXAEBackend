const Joi = require('joi');

const tshirtValidationSchema = Joi.object({
  productId: Joi.string().trim(),
  name: Joi.string().required().trim().max(100),
  thumbnailImage: Joi.string().required().trim(),
  otherImages: Joi.array().items(Joi.string().trim()),
  description: Joi.string().required().max(1000),
  price: Joi.number().required().min(0),
  quantity: Joi.number().required().min(0),
  sizes: Joi.array().items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL')).min(1).required(),
  colors: Joi.array().items(Joi.string().trim()).min(1).required()
});

const updateTshirtValidationSchema = Joi.object({
  productId: Joi.string().trim(),
  name: Joi.string().trim().max(100),
  thumbnailImage: Joi.string().trim(),
  otherImages: Joi.array().items(Joi.string().trim()),
  description: Joi.string().max(1000),
  price: Joi.number().min(0),
  quantity: Joi.number().min(0),
  sizes: Joi.array().items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL')),
  colors: Joi.array().items(Joi.string().trim())
}).min(1);

const addToCartValidationSchema = Joi.object({
  tshirtId: Joi.string(),
  productId: Joi.string(),
  name: Joi.string().required().trim().max(100),
  price: Joi.number().required().min(0),
  quantity: Joi.number().required().min(1),
  size: Joi.string().required().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'),
  color: Joi.string().required().trim(),
  thumbnailImage: Joi.string().trim()
}).or('tshirtId', 'productId');

const updateCartValidationSchema = Joi.object({
  itemId: Joi.string().required(),
  quantity: Joi.number().required().min(1)
});

const orderItemValidationSchema = Joi.object({
  productId: Joi.string().required().trim(),
  tshirtId: Joi.string().required(),
  name: Joi.string().required().trim().max(100),
  price: Joi.number().required().min(0),
  quantity: Joi.number().required().min(1),
  size: Joi.string().required().valid('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'),
  color: Joi.string().required().trim(),
  thumbnailImage: Joi.string().trim(),
  isconfirmed: Joi.boolean(),
  ispacked: Joi.boolean(),
  isdilivered: Joi.boolean()
});

const createOrderValidationSchema = Joi.object({
  customerName: Joi.string().required().trim().max(100),
  email: Joi.string().required().trim().email(),
  whatsapp: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  items: Joi.array().items(orderItemValidationSchema).min(1).required(),
  subtotal: Joi.number().required().min(0),
  tax: Joi.number().required().min(0),
  total: Joi.number().required().min(0)
});

const updateOrderStatusValidationSchema = Joi.object({
  isOrderConfirmed: Joi.boolean(),
  isOrderPacking: Joi.boolean(),
  isOrderDelivered: Joi.boolean()
}).min(1);

const validateTshirt = (req, res, next) => {
  const { error } = tshirtValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateUpdateTshirt = (req, res, next) => {
  const { error } = updateTshirtValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateAddToCart = (req, res, next) => {
  const { error } = addToCartValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateUpdateCart = (req, res, next) => {
  const { error } = updateCartValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  next();
};

const validateCreateOrder = (req, res, next) => {
  const { error } = createOrderValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateUpdateOrderStatus = (req, res, next) => {
  const { error } = updateOrderStatusValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = {
  validateTshirt,
  validateUpdateTshirt,
  validateAddToCart,
  validateUpdateCart,
  validateId,
  validateCreateOrder,
  validateUpdateOrderStatus
};
