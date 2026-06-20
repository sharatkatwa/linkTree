import jwt from "jsonwebtoken";
import env from "../../config/config.js";
import userModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) res.status(400).json({ message: "token not found" });

    const decoded = await jwt.verify(token, env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) res.status(400).json({ message: "invalid token" });

    req.user = user;
    next();
  } catch (err) {
    throw new Error("invalid token");
  }
};
