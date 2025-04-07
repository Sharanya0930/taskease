const db = require("../config/db");

const User = {
  findByEmail: async (email) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error("Database Error:", err);
      throw err;
    }
  },
  create: async ({ name, email, password }) => {
    try {
      await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        password,
      ]);
    } catch (err) {
      console.error("Database Error:", err);
      throw err;
    }
  }
};

module.exports = User;
