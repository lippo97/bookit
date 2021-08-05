import Joi from 'joi';

export const Email = Joi.string().email({ tlds: { allow: false } });

export const Password = Joi.string();
