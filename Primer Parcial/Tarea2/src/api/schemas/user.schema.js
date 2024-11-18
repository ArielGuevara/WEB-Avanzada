//file schemas/product.schema.js
const Joi = require('joi');

const id = Joi.string().alphanum().length(24);
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
})

const updateUserSchema = Joi.object({
  // name: name,
  email: email,
  password: password,
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
