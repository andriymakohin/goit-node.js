const contacts =  require("./contacts");

class ContactController {
  async getContacts(req, res, next) {
    try {
      const { sub, page, limit } = req.query;
      const result = await contacts.listContacts(
        sub ? { subscription: sub } : {},
        page,
        limit,
      );
      result ? res.status(200).json(result) : res.status(404).json({ message: 'Contacts not found!' });
    } catch (error) {
      next(error);
    }
  }

  async getSingleContact(req, res, next) {
    const { id } = req.params;
    try {
      const result = await contacts.getContactById(id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async createContact(req, res, next) {
    try {
      const result = await contacts.addContact(req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteContact(req, res, next) {
    const { id } = req.params;
    try {
      const result = await contacts.removeContact(id);
      if (result) {
        res.status(200).send({ message: "contact deleted" });
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req, res, next) {
    const { id } = req.params;
    const newContactFields = req.body;
    try {
      if (newContactFields) {
        const result = await contacts.editContact(id, newContactFields);
        result
          ? res.status(200).send(result)
          : res.status(404).send({ message: "Not found" });
      } else {
        res.status(400).send({ message: "missing fields" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();