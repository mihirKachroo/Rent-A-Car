const express = require('express');
const router = express.Router();
const { getListings, createListing, updateListingStatus } = require('../controllers/listingController');

router.get('/', getListings);
router.post('/', createListing);
router.put('/status', updateListingStatus);

module.exports = router;
