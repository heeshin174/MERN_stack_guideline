import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") // Bearer token
    ) {
      try {
        // Get token from header (split[0] = "Bearer", split[1] = token)
        token = req.headers.authorization.split(" ")[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        // Not include req.user.password (password is hashed)
        req.user = await User.findById(decoded.id).select("-password");

        // At the end of the middleware, we want to able to call next() piece of middleware.
        next();
      } catch (err) {
        console.log(err.message);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (err) {
    next(err);
  }
};
