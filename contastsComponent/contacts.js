const path = require("path");
const fs = require("fs");
const shortid = require("shortid");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  try {
    const data = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contact = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
    const currentContac = contact.find((el) => el.id === contactId);
    return  currentContac;
  } catch (err) {
    console.log(err.message);
  }
};

async function editContact(contactId, obj) {
  try {
    const data = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
     const foundContact = data.find((el) => el.id === contactId);
    const neweData = data.filter((el) => el.id !== contactId);
    const newContact = { ...foundContact, ...obj };
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify([...neweData, newContact], null, 2)
    );
    if (foundContact) {
      return newContact;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contact = await fsPromises.readFile(contactsPath, "utf-8");
    const filtredContacts = JSON.parse(contact).filter(
      (contact) => contact.id !== contactId
    );

    if (filtredContacts.length !== JSON.parse(contact).length) {
      await fsPromises.writeFile(
        contactsPath,
        JSON.stringify(filtredContacts, null, 2)
      );
      return "ok";
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(obj) {
  const contactsData = JSON.parse(await fs.readFileSync(contactsPath, "utf8"));
  const id = shortid.generate().toLowerCase();
  contactsData.push({ id, ...obj });

  await fsPromises.writeFile(
    contactsPath,
    JSON.stringify(contactsData, null, 2)
  );
  const data = await fsPromises.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts.find((el) => el.id === id);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};