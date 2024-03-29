import Joi from "@hapi/joi";

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(100).required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.ref("password"),
  email: Joi.string().email().required(),
  profilePic: Joi.string().optional(),
  isAdmin: Joi.string().optional(),
});

const loginWithEmailAndPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { signupSchema, loginWithEmailAndPasswordSchema, resetPasswordSchema };
