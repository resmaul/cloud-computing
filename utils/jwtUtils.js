const jwt = require("jsonwebtoken");
require("dotenv").config();

// Fungsi untuk menghasilkan token akses
function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });
}

module.exports = {
  generateAccessToken,
};
