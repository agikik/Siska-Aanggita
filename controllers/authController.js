const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'your_secret_key'; // Ganti dengan kunci rahasia yang kuat

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Hash password sebelum menyimpannya di database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, role });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Temukan pengguna berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (user) {
      // Bandingkan password yang diberikan dengan password yang di-hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Buat token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.status(200).send({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
