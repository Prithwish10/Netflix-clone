import Joi from "@hapi/joi";

const createListSchema = Joi.object({
    title: Joi.string().min(2).required(),
    type: Joi.string().min(2).required(),
    genre: Joi.string().min(2).required(),
    content: Joi.array().required(),
});

export { createListSchema };