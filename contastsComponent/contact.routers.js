const { Router } = require("express");
const ContactController = require("./contact.controller");
const router = Router();

router.get("/", ContactController.getContacts);
router.get("/:id", ContactController.getSingleContact);
router.post(
  "/",
  ContactController.contactValidate,
  ContactController.createContact
);

router.patch("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

module.exports = router;