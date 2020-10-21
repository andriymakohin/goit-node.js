const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string(),
});

const UpdateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string(),
});

const validate = async (schema, data) => {
  const { error } = await schema.validate(data);
  if (error) {
    const message = error.details.reduce((message, item) => {
      if (message) return `${message}, ${item.message}`;
      return `${item.message}`;
    }, '');
    throw new Error(message);
  }
};

const validateCreateContactMiddleware = async (req, res, next) => {
  try {
    await validate(createContactSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send({ message: e.message });
    res.end();
    return;
  }
};

const validateUpdateContactMiddleware = async (req, res, next) => {
  try {
    await validate(UpdateContactSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send({ message: e.message });
    res.end();
    return;
  }
};

module.exports = {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
};