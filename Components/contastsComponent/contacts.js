const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const { ObjectId } = require('mongoose').Types;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  subscription: {
    type: String,
    default: 'free',
    trim: true,
  },
  token: {
    type: String,
    trim: true,
  },
}, { versionKey: false });

contactSchema.plugin(mongoosePaginate);

class Contact {
  constructor() {
    this.contact = mongoose.model('Contact', contactSchema);
  }

  listContacts = async (query, page = 1, limit = 20) => {
    const options = {
      page,
      limit,
    };
    return await this.contact
      .paginate(query, options)
      .then(docs => docs)
      .catch(err => {
        throw err;
      });
  };

  getContactById = async contactId => {
    if (ObjectId.isValid(contactId)) {
      return await this.contact
        .findById(contactId)
        .then(res => res)
        .catch(err => {
          throw err;
        });
    }
    throw { message: 'Invalid contact id' };
  };

  removeContact = async contactId => {
    if (ObjectId.isValid(contactId)) {
      return await this.contact
        .findByIdAndDelete(contactId)
        .then(res => res)
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
    throw { message: 'Invalid contact id' };
  };

  addContact = async contact => {
    return await this.contact
      .create(contact)
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };

  editContact = async (contactId, newData) => {
    return await this.contact
      .findByIdAndUpdate(contactId, newData, {
        new: true,
      })
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };
}

module.exports = new Contact();
