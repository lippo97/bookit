/* eslint-disable no-underscore-dangle */
import Joi from 'joi';
import mongoose, { Document } from 'mongoose';
import makeJoigoose from 'joigoose';

const Joigoose = makeJoigoose(mongoose);

function extractName(schema: Joi.ObjectSchema<any>): string {
  return schema.$_terms.metas[0].className;
}

function extractKeys(schema: Joi.ObjectSchema<any>): string[] {
  return schema.$_terms.keys.map(({ key }: any) => key);
}

function extractSchema<T>(
  joiSchema: Joi.ObjectSchema<any>,
): mongoose.Schema<T> {
  return new mongoose.Schema<T>(Joigoose.convert(joiSchema));
}

type FromJoiOptions = Partial<{
  name: string;
}>;

// type ModelResult<T> = [
//   mongoose.Model<T & mongoose.Document<any, any, any>, {}, {}>,
//   mongoose.Schema<T>,
//   string[],
// ];

type ModelResult<T> = [
  mongoose.Model<T & mongoose.Document<any, any, any>, {}, {}>,
  ...SchemaResult<T>
];

type SchemaResult<T> = [mongoose.Schema<T>, string[]];

function getSchemaFromJoi<T>(
  joiSchema: Joi.ObjectSchema<any>,
): SchemaResult<T> {
  const schema = extractSchema<T>(joiSchema);
  const modelProperties = extractKeys(joiSchema);

  return [schema, modelProperties];
}

function getModelFromJoi<T>(
  joiSchema: Joi.ObjectSchema<any>,
  options?: FromJoiOptions,
): ModelResult<T> {
  const name = options?.name || extractName(joiSchema);
  const [schema, modelProperties] = getSchemaFromJoi<T>(joiSchema);
  const model = mongoose.model<T & Document>(name, schema);

  return [model, schema, modelProperties];
}

export class ResourceBuilder {
  extractKeys = extractKeys;

  extractSchema = extractSchema;

  getModelFromJoi = getModelFromJoi;

  getSchemaFromJoi = getSchemaFromJoi;
}

export const Resource = new ResourceBuilder();

// export default {
//   extractKeys,
//   extractSchema,
//   fromJoi,
// };
