//file schemas/product.schema.js
const Joi = require('joi');

const email = Joi.string().email().required();
const password = Joi.string().required();

const loginSchema = Joi.object({
  email: email,
  password: password,
})

module.exports = { loginSchema }
