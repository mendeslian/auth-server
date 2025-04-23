import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not exist" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const findUser = await user.findByPk(decoded.id);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.session.userId = findUser.id;

    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { authMiddleware };
