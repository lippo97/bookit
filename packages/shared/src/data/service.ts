import Joi from 'joi';
import { services } from '../types/services';

export const ServiceSchema = Joi.valid(...services).meta({
  className: 'Service',
});
