const express = require('express');
const listingController = require('../controllers/listingController');

module.exports = (connection) => {
  const router = express.Router();

  const controller = listingController(connection);

  router.get('/', controller.getListings);
  router.post('/', controller.createListing);
  router.put('/status', controller.updateListingStatus);
  // router.get('/search', controller.searchListings);
  router.get('/search/filters', controller.searchListingsWithFilters);
  
  return router;
};
