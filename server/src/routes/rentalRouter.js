const express = require('express');
const router = express.Router();
const { createRental, getUserRentals } = require('../controllers/rentalController');

router.post('/', createRental);
router.get('/:userId', getUserRentals);

module.exports = router;
