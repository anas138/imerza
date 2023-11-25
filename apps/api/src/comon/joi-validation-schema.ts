import * as Joi from 'joi';

export const galleryValidationSchema = Joi.object({
  name: Joi.string().required(),
  user: Joi.string().required(),
  project:Joi.string().required()
});

export const signUpValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  projectId: Joi.string().required(),
  role: Joi.string().required(),
});
export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const setPasswordValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
export const superAdmin = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const mediaValidation = Joi.object({
  projectRoot: Joi.string().required(),
  user: Joi.string().required(),
});
