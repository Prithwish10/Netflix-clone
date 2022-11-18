import Joi from "@hapi/joi";

const createMovieSchema = Joi.object({
  title: Joi.string().min(1).required(),
  desc: Joi.string().min(2).required(),
  image: Joi.string().required(),
  imageTitle: Joi.string().min(2).required(),
  imageSm: Joi.string().required(),
  trailer: Joi.string().min(2).required(),
  video: Joi.string().min(2).required(),
  limit: Joi.number().integer().required(),
  genre: Joi.string().min(2).required(),
  isSeries: Joi.string().optional(),
});

const updateMovieSchema = Joi.object({
  title: Joi.string().min(2).optional(),
  desc: Joi.string().min(2).optional(),
  image: Joi.string().optional(),
  imageTitle: Joi.string().min(2).optional(),
  imageSm: Joi.string().optional(),
  trailer: Joi.string().min(2).optional(),
  video: Joi.string().min(2).optional(),
  limit: Joi.number().integer().optional(),
  genre: Joi.string().min(2).optional(),
  isSeries: Joi.string().optional(),
});

export { createMovieSchema, updateMovieSchema };
