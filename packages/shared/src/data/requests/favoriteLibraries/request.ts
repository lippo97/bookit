import Joi from 'joi';

const fields = {
  libraryId: Joi.string().required(),
};

export const FavoriteLibraryRequestSchema = Joi.object(fields).meta({
  className: 'FavoriteLibraryRequest',
});
