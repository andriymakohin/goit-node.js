const { Router } = require('express');
const authController = require('./auth.controller');
const authValidator = require('./auth.validator');
const { authMiddleware } = require('./auth.middleware');
const authRouter = Router();

authRouter.post('/register', authValidator.validateSignUpMiddleware, authController.signupUser);
authRouter.post('/login', authValidator.validateLogInMiddleware, authController.loginUser);
authRouter.post('/logout', authMiddleware, authController.logoutUser);

module.exports = authRouter;