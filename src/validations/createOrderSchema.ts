import Joi from 'joi';

export const createOrderSchema = Joi.object({
  pickupAddress: Joi.string().trim().required().messages({
    'string.empty': 'Pickup address is required',
    'any.required': 'Pickup address is required',
  }),

  sellerName: Joi.string().trim().required().messages({
    'string.empty': 'Seller name is required',
    'any.required': 'Seller name is required',
  }),

  sellerAddress: Joi.string().trim().required().messages({
    'string.empty': 'Seller address is required',
    'any.required': 'Seller address is required',
  }),
}).unknown(true);

export const createDropDetailsSchema = Joi.object({
  dropName: Joi.string().min(2).max(50).required().label('Drop Name'),

  dropMobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .label('Drop Mobile'),

  dropAlternative_mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .label('Drop Alternative Mobile'),

  dropAddress: Joi.string().min(5).required().label('Drop Address'),

  dropPincode: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .label('Drop Pincode'),
}).unknown(true);

export const productSchema = Joi.object({
  productName: Joi.string().required().label('Product Name'),
  productCategory: Joi.string().required().label('Product Category'),
  productPrice: Joi.number().min(0).required().label('Product Price'),
  paymentMode: Joi.string()
    .required()
    .messages({'any.required': 'Select Payment Mode'}),
  totalTaxes: Joi.number().min(0).required().label('Total Taxes'),
  l: Joi.number().min(0).required().label('Length'),
  b: Joi.number().min(0).required().label('Breadth'),
  h: Joi.number().min(0).required().label('Height'),
  actualWeight: Joi.number().greater(0).required().label('Dead/Actual Weight'),
  totalAmount: Joi.number().min(0).required().label('Total Amount'),
}).unknown(true);
