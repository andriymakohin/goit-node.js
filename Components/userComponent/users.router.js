const { Router } = require('express');
const usersController = require('./users.controller');
const { validateUpdateUserMiddleware } = require('./users.validator');
const { authMiddleware } = require('../authComponent/auth.middleware');

const usersRouter = Router();

usersRouter.get('/', authMiddleware, usersController.getUsers);
usersRouter.get('/current', authMiddleware, usersController.getCurrentUser);
usersRouter.get('/:id', authMiddleware, usersController.getUserById);
usersRouter.delete('/:id', authMiddleware, usersController.deleteUserById);
usersRouter.patch(
  '/:id',
  validateUpdateUserMiddleware,
  authMiddleware,
  usersController.updateUserById,
);

module.exports = usersRouter;