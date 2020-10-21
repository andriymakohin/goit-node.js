const { Router } = require('express');

const contactsController = require('./contact.controller');

const {validateCreateContactMiddleware,
  validateUpdateContactMiddleware} = require('./contact.valid');


const contactsRouter = Router();

contactsRouter.get('/', contactsController.getContacts);

contactsRouter.get('/:id', contactsController.getSingleContact);

contactsRouter.post('/', validateCreateContactMiddleware, contactsController.createContact);

contactsRouter.delete('/:id', contactsController.deleteContact);

contactsRouter.patch('/:id', validateUpdateContactMiddleware, contactsController.updateContact);

module.exports = contactsRouter;