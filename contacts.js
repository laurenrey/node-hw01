const fs = require("fs").promises;
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

const id = nanoid();

async function listContacts() {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const requiredContact = data.find((contact) => contact.id === contactId);
    console.log(requiredContact);
    return requiredContact;
  } catch (error) {
    console.log(error);
  }
}
async function addContact(name, email, phone) {
  try {
    const contact = { id, name, email, phone };
    const data = await listContacts();
    data.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const removedContact = data.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2));
    console.log(`${contactId} has been removed`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
