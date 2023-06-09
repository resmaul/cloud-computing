const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/jwtUtils");

// Middleware autentikasi
function authenticateToken(req, res, next) {
  // Mendapatkan token dari header Authorization
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }

    // Menyimpan data pengguna yang diverifikasi ke objek req
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
