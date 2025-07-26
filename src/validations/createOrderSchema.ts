import Joi from 'joi';

export const createOrderSchema = Joi.object({
  pickupAddress: Joi.string().trim().required().messages({
    'string.empty': 'Pickup address is required',
    'any.required': 'Pickup address is required',
  }),
}).unknown(true);

export const createDropDetailsSchema = Joi.object({
  dropName: Joi.string().min(2).max(50).required().label('Drop Name'),

  dropMobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .label('Drop Mobile'),

  dropAddress: Joi.string().min(5).required().label('Drop Address'),
  dropCity: Joi.string().required().label('Drop City'),
  dropState: Joi.string().required().label('Drop State'),
  dropPincode: Joi.alternatives()
    .try(
      Joi.string()
        .pattern(/^\d{6}$/)
        .length(6),
      Joi.number().integer().min(100000).max(999999),
    )
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
