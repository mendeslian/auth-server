import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schemas/authSchemas.js";

const router = Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  AuthController.register
);
router.post("/login", validateSchema(loginSchema), AuthController.signIn);
router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  AuthController.resetPassword
);

export default router;
