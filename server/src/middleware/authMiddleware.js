import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.name);
    console.log("JWT Message:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;