import Joi from 'joi';

export const sellerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().label('Seller Name'),
  address: Joi.string().min(5).max(200).required().label('Seller Address'),
});
