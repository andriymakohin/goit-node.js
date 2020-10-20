const path = require("path");
const fs = require("fs");
const shortid = require("shortid");
// const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  await fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

async function getContactById(contactId) {
  await fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const currentContact = contacts.find((contact) => contact.id === contactId);
    if (!currentContact) return console.log("Контакт не знайдено!");
    console.log(`Знайдено котакт з id-${contactId}: `, currentContact);
  });
}

async function removeContact(contactId) {
  await fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const filtredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filtredContacts), (err) => {
      if (err) throw err;
      console.log(`Контакт з id-${contactId} видалено`);
      console.log(
        "Залишилися ще такі id: ",
        filtredContacts.map((contact) => contact.id).join(",")
      );
    });
  });
}

async function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
    id: shortid.generate().toLowerCase(),
  };
  await fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
      console.log(`Додано новий контакт з id-${newContact.id}`);
      console.log(
        "На даний момент є такі id: ",
        contacts.map((contact) => contact.id).join(",")
      );
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
