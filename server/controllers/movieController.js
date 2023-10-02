const Movie = require('../models/movies');
const asyncHandler = require('express-async-handler');

// desc Get all movies
// route GET /api/movies
// access Public
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

const getIsWatching = asyncHandler(async (req, res) => {
    const movie = await Movie.find({ isWatching: 'true' });
    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

// desc Add a movie
// route POST /api/movies
// access Public
const addMovie = asyncHandler(async (req, res) => {
    const { title, imdbID, recommendedBy, notes } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please provide a title');
    }

    const duplicateMovie = await Movie.findOne({ imdbID });

    if (duplicateMovie) {
        res.status(201).json({
            _id: duplicateMovie._id,
            title: duplicateMovie.title,
            imdbID: duplicateMovie.imdbID,
            recommendedBy: duplicateMovie.recommendedBy,
            notes: duplicateMovie.notes,
        });
        return;
    }

    const movie = await Movie.create({
        title,
        imdbID,
        recommendedBy,
        notes,
    });

    if (movie) {
        res.status(201).json({
            _id: movie._id,
            title: movie.title,
            imdbID: movie.imdbID,
            recommendedBy: movie.recommendedBy,
            notes: movie.notes,
        });
    } else {
        res.status(400);
        throw new Error('Invalid movie data');
    }
});

// desc Update movie to isWatching
// route PUT /api/movies/:id
// access Public
const updateMovie = asyncHandler(async (req, res) => {
    const oldMovie = await Movie.findOne({ isWatching: true });

    if (oldMovie) {
        console.log('found a movie', oldMovie);
        oldMovie.isWatching = false;
        await oldMovie.save();
    }

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    movie.isWatching = !movie.isWatching;

    const updatedMovie = await movie.save();

    res.json({ message: 'Movie updated', updatedMovie });
});

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    getIsWatching,
};
