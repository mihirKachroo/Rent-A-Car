const express = require('express');
const authController = require('../controllers/authController');

const authRouter = (connection) => {
  const router = express.Router();

  // Inject the MySQL connection into the controller
  const controller = authController(connection);

  router.post('/register', controller.register);
  router.post('/login', controller.login);
  router.post('/owner-register', controller.ownerRegister);
  router.post('/owner-login', controller.ownerLogin);

  return router;
};

module.exports = authRouter;
