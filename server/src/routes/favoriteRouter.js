const express = require('express');
const router = express.Router();
const { addFavorite, getUserFavorites } = require('../controllers/favoriteController');

router.post('/', addFavorite);
router.get('/:userId', getUserFavorites);

module.exports = router;
