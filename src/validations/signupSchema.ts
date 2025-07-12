import Joi from 'joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().label('First Name'),
  lastName: Joi.string().min(2).max(30).required().label('Last Name'),
  phoneNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .label('Phone Number')
    .messages({
      'string.pattern.base':
        'Phone Number must be a valid 10-digit Indian number',
    }),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .label('Email'),
  password: Joi.string().min(6).max(50).required().label('Password'),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({'any.only': 'Confirm Password must match Password'}),
});
