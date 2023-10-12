const User = require("../models/User");
const bcrypt = require("bcrypt");
const config = require('../config')
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Nombre de usuario ya registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    return res.status(500).json({ error: "Error al registrar el usuario." });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión." });
  }
}

function logout(req, res) {
  res.clearCookie('token');
  return res.json({ message: "Sesión cerrada." });
}

module.exports = {
  register,
  login,
  logout,
};
