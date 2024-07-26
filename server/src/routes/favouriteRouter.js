const express = require('express');
const favouriteController = require('../controllers/favouriteController');

module.exports = (connection) => {
  const router = express.Router();

  const controller = favouriteController(connection);
  
  router.post('/', controller.addFavourite);
  router.delete('/', controller.removeFavourite);
  router.get('/:userId', controller.getUserFavorites);

  return router;
};
