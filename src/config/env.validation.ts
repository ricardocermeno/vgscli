import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // VGS Configuration (Required)
  VGS_USERNAME: Joi.string().required().messages({
    'string.empty': 'VGS_USERNAME is required',
    'any.required': 'VGS_USERNAME is required',
  }),
  VGS_PASSWORD: Joi.string().required().messages({
    'string.empty': 'VGS_PASSWORD is required',
    'any.required': 'VGS_PASSWORD is required',
  }),
  VGS_HOST: Joi.string().optional().allow('').messages({
    'string.base': 'VGS_HOST must be a string',
  }),

  // Node Environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
});
