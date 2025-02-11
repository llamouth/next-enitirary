const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  try {
    const { username, email, password, profile_picture, bio, first_name, last_name } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.one(
      "INSERT INTO users (username, email, password_hash, profile_picture, bio, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [username, email, hashedPassword, profile_picture, bio, first_name, last_name]
    );

    return newUser
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE email = $1", [email]);
    return user
  } catch (error) {
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id = $1", [id]);
    return user;
  } catch (error) {
    return null;
  }
};

const updateUser = async (id, updates) => {
  try {
    const { username, email, profile_picture, bio, first_name, last_name } = updates;

    const updatedUser = await db.one(
      "UPDATE users SET username = $1, email = $2, profile_picture = $3, bio = $4, first_name = $5, last_name = $6 WHERE id = $7 RETURNING *",
      [username, email, profile_picture, bio, first_name, last_name, id]
    );

    return updatedUser;
  } catch (error) {
    return null;
  }
};

const updateUserPassword = async (id, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await db.one(
      "UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING *",
      [hashedPassword, id]
    );

    return updatedUser;
  } catch (error) {
    return null;
  }
};

module.exports = { createUser, getUserByEmail, updateUser, getUserById, updateUserPassword };
