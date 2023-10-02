const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router
    .route('/')
    .get(movieController.getAllMovies)
    .post(movieController.addMovie);
router.route('/isWatching').get(movieController.getIsWatching);

router
    .route('/:id')
    .get(movieController.getMovieById)
    .put(movieController.updateMovie);

module.exports = router;
