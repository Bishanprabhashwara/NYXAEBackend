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

module.exports = {
  validateTshirt,
  validateUpdateTshirt,
  validateId
};
