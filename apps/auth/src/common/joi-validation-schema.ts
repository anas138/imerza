import * as Joi from "joi"

export const userValidationSchema =Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().required(),
    permission:Joi.string().required()
}) 