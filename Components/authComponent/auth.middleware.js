const jwt = require('jsonwebtoken');
const userModel = require('../userComponent/users');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ succes: false, message: 'Not authorized' });
      return;
    }
    const parsedToken = token.replace('Bearer ', '');
    const data = await jwt.verify(parsedToken, process.env.PRIVATE_JWT_KEY);
    const user = await userModel.getUserById(data.id);
    req.currentUser = user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { authMiddleware };