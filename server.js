const express = require("express");
const db = require("./database");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Terhubung ke database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Terhubung ke database MySQL");
});

// Route untuk pengguna
app.use("/api/users", userRoutes);

// Jalankan server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
