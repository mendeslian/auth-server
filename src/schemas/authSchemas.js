import joi from "joi";

export const registerSchema = joi.object({
  fullName: joi.string().min(3).required(),
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const forgotPasswordSchema = joi.object({
  email: joi.string().email().required(),
});

export const resetPasswordSchema = joi.object({
  token: joi.string().required(),
  newPassword: joi.string().min(8).required(),
});
