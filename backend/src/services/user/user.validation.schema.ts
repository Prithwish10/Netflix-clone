import Joi from "@hapi/joi";

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(100).optional(),
  password: Joi.string().min(8).optional(),
  email: Joi.string().email().optional(),
  profilePic: Joi.string().optional(),
});

export { updateUserSchema };
