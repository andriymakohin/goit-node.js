const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongoose').Types;

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  subscription: String,
  password: String,
  token: String,
}, { versionKey: false });

class Contact {
  constructor() {
    this.contact = mongoose.model('Contact', contactSchema);
  }

  listContacts = async () => {
    return await this.contact.find();
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
