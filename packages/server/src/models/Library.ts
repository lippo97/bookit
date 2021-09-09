import { LibrarySchema as LibraryJoiSchema } from '@asw-project/shared/data/library';
import { Library } from '@asw-project/shared/generatedTypes/library';
import { Resource } from '@asw-project/resources';
import mongoose, { Document } from 'mongoose';

export const [LibrarySchema, libraryKeys] =
  Resource.getSchemaFromJoi<Library>(LibraryJoiSchema);

LibrarySchema.index({ name: 'text', city: 'text' });

export const LibraryModel = mongoose.model<Library & Document<any, any, any>>(
  'Library',
  LibrarySchema,
);
