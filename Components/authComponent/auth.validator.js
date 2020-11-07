const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'ru', 'ua', 'net'] },
    })
    .required(),

  subscription: Joi.any().allow('free', 'pro', 'premium').only(),
  password: Joi.string().min(8).max(24).required(),
  token: Joi.string().max(100).empty('').default(' '),
  avatarUrl: Joi.string().max(100).empty('').default(' '),
});

const UpdateUserSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'ru', 'ua', 'net'] },
  }),

  subscription: Joi.any().allow('free', 'pro', 'premium').only(),
  password: Joi.string().min(8).max(24),
  token: Joi.string().max(100).empty('').default(''),
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

const validateSignUpMiddleware = async (req, res, next) => {
  try {
    await validate(createUserSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send({ succes: false, message: e.message });
    res.end();
    return;
  }
};

const validateLogInMiddleware = async (req, res, next) => {
  try {
    await validate(UpdateUserSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send({ succes: false, message: e.message });
    res.end();
    return;
  }
};

module.exports = {
  validateSignUpMiddleware,
  validateLogInMiddleware,
};