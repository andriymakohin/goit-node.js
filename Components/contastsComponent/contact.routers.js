const { Router } = require('express');

const contactsController = require('./contact.controller');

const {validateCreateContactMiddleware,
  validateUpdateContactMiddleware} = require('./contact.valid');

const { authMiddleware } = require('../authComponent/auth.middleware');

const contactsRouter = Router();

contactsRouter.get('/', contactsController.getContacts);

contactsRouter.get('/?sub = free', contactsController.getContacts);

contactsRouter.get('/:id', contactsController.getSingleContact);

contactsRouter.post('/', authMiddleware, validateCreateContactMiddleware, contactsController.createContact);

contactsRouter.delete('/:id', authMiddleware, contactsController.deleteContact);

contactsRouter.patch('/:id', authMiddleware, validateUpdateContactMiddleware, contactsController.updateContact);

module.exports = contactsRouter;