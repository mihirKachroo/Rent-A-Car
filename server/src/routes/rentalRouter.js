const express = require('express');
const rentalController = require('../controllers/rentalController');

module.exports = (connection) => {
  const router = express.Router();

  const controller = rentalController(connection);
  
  router.post('/', controller.createRental);
  router.get('/:userId', controller.getUserRentals);

  return router;
};
