import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const verifyToken = (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1]; // Bearer <token>
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
