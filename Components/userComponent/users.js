const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { ObjectId } = require('mongoose').Types;

const userSchema = new Schema (
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    token: { type: String },
  },
  { versionKey: false },
);

class User {
  constructor() {
    this.user = mongoose.model('user', userSchema);
  }

  getUsers = async (query = {}) => {
    return await this.user
      .find(query)
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };

  getUserById = async id => {
    if (ObjectId.isValid(id)) {
      return await this.user
        .findById(id)
        .then(doc => doc)
        .catch(error => {
          throw error;
        });
    } else {
      throw { message: 'Invalid user id' };
    }
  };

  createUser = async data => {
    return await this.user
      .create(data)
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  deleteUserById = async id => {
    if (ObjectId.isValid(id)) {
      return await this.user
        .findByIdAndDelete(id)
        .then(res => res)
        .catch(error => {
          throw error;
        });
    }
    throw { message: 'Invalid user id' };
  };

  updateUser = async (id, data) => {
    if (ObjectId.isValid(id)) {
      return await this.user
        .findByIdAndUpdate(id, data, { new: true })
        .then(doc => {
          return { email: doc.email, subscription: doc.subscription };
        })
        .catch(error => {
          throw error;
        });
    }
    throw { message: 'Invalid user id' };
  };
}

module.exports = new User();