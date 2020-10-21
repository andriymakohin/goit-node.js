const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
} = require("./contacts");

class ContactController {
  async getContacts(req, res, next) {
    try {
      const result = await listContacts();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleContact(req, res, next) {
    const idString = req.params.id;
    const idNumber = parseInt(req.params.id);
    let id = idString == idNumber ? idNumber  : idString  ;
    try {
      const result = await getContactById(id);
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
      const result = await addContact(req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteContact(req, res, next) {
    const idString = req.params.id;
    const idNumber = parseInt(req.params.id);
    let id = idString == idNumber ? idNumber  : idString  ;
    try {
      const result = await removeContact(id);
      if (result === "ok") {
        res.status(200).send({ message: "contact deleted" });
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req, res, next) {
    const idString = req.params.id;
    const idNumber = parseInt(req.params.id);
    let id = idString == idNumber ? idNumber  : idString  ;
    const { name, email, phone } = req.body;
    try {
      if (name || email || phone) {
        const result = await editContact(id, req.body);
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

  contactValidate(req, res, next) {
    const valShema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const { error } = valShema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: "missing required name field" });
    }
    next();
  }
}

module.exports = new ContactController();