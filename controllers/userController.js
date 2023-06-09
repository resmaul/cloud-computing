const db = require("../database");

// API register
function registerUser(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password dan konfirmasi password tidak sesuai" });
  }

  // Cek apakah username sudah terdaftar
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Username sudah terdaftar" });
    }

    const newUser = { username, email, password };

    // Simpan pengguna baru ke database
    db.query("INSERT INTO users SET ?", newUser, (err, result) => {
      if (err) {
        throw err;
      }

      res.status(201).json({ message: "Pengguna berhasil didaftarkan" });
    });
  });
}

module.exports = {
  registerUser,
};
