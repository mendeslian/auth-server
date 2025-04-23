import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Op } from "sequelize";
import crypto from "crypto";
import ResponseHandler from "../utils/responseHandler.js";

class AuthController {
  static async register(req, res) {
    try {
      const { fullName, username, email, password } = req.body;
      const salt = await bcrypt.genSalt(12);

      const userAlreadyExists = await user.findOne({ where: { email } });
      if (userAlreadyExists) {
        return ResponseHandler.badRequest(res, "Email already registered");
      }

      const passwordHash = await bcrypt.hash(password, salt);

      await user.create({
        fullName,
        username,
        email,
        password: passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      });

      return ResponseHandler.success(res, {
        status: 201,
        message: "User created successfully",
      });
    } catch (e) {
      return ResponseHandler.error(res, {
        message: "Internal server error",
        error: e,
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await user.findOne({ where: { email } });
      if (!findUser) {
        return ResponseHandler.notFound(res, "Email or password incorrect");
      }

      const { password: excludedPassword, ...userWithoutPassword } =
        findUser.dataValues;

      const verifyPassword = await bcrypt.compare(password, findUser.password);
      if (!verifyPassword) {
        return ResponseHandler.notFound(res, "Email or password incorrect");
      }

      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: findUser.id,
          email: findUser.email,
          username: findUser.username,
          fullName: findUser.fullName,
          createdAt: new Date().toISOString(),
        },
        secret,
        {
          expiresIn: "7d",
          algorithm: "HS256",
        }
      );

      return ResponseHandler.success(res, {
        message: "Login successful",
        data: {
          user: {
            ...userWithoutPassword,
            token,
          },
        },
      });
    } catch (e) {
      return ResponseHandler.error(res, {
        message: "Internal server error",
        error: e,
      });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const findUser = await user.findOne({ where: { email } });
      if (!findUser) {
        return ResponseHandler.notFound(res, "User not found");
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = new Date(Date.now() + 3600000);

      await findUser.update({
        resetToken,
        resetTokenExpiry: tokenExpiry,
      });

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "nailptm@gmail.com",
        subject: "Password Reset Request",
        html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">link</a> to reset your password</p>
          <p>This link will expire in 1 hour</p>
        `,
      });

      return ResponseHandler.success(res, {
        message: "Password reset instructions sent to your email",
      });
    } catch (e) {
      return ResponseHandler.error(res, {
        message: "Internal server error",
        error: e,
      });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      const findUser = await user.findOne({
        where: {
          resetToken: token,
          resetTokenExpiry: { [Op.gt]: new Date() },
        },
      });

      if (!findUser) {
        return ResponseHandler.badRequest(
          res,
          "Invalid or expired reset token"
        );
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      await findUser.update({
        password: passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      });

      return ResponseHandler.success(res, {
        message: "Password reset successfully",
      });
    } catch (e) {
      return ResponseHandler.error(res, {
        message: "Internal server error",
        error: e,
      });
    }
  }
}

export default AuthController;
