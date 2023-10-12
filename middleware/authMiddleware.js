const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  console.log("Token:", token); 
  console.log("🚀 ~ file: authMiddleware.js:14 ~ jwt.verify ~ config.jwtSecret:", config.jwtSecret);

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token no válido." });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
