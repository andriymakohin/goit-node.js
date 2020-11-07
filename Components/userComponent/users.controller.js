const User = require('./users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedUser = await User.getUserById(id);
    foundedUser
      ? res.status(200).json(foundedUser)
      : res.status(400).json({ succes: false, message: 'User not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.deleteUserById(id);
    deletedUser
      ? res.status(200).json({ message: `Contact succesful deleted!` })
      : res.status(400).json({ message: 'Contact not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserById = async (req, res) => {
  let newUserFields = req.body;
  const { id } = req.params;

  if (!newUserFields) {
    return res.status(400).json({ message: 'missing fields' });
  }

  if (newUserFields.password) {
    const hashPassword = await bcrypt.hash(newUserFields.password, +process.env.BCRYPT_SALT);

    newUserFields = { ...newUserFields, password: hashPassword };
  }

  try {
    const result = await User.updateUser(id, newUserFields);

    !result
      ? res.status(404).json({ message: 'User not found' })
      : res.status(200).json({ succes: true, message: 'Updated!', user: result });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(422).send({ succes: false, error });
    }

    return res.status(400).json(error);
  }
};

const getCurrentUser = async (req, res) => {
  if (!req.currentUser) {
    res.status(401).json({ succes: false, message: 'Not authorized' });
    return;
  }

  const { email, subscription } = req.currentUser;
  res.status(200).json({ email, subscription });
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getCurrentUser,
};