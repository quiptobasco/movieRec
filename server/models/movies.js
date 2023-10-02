const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imdbID: {
            type: String,
            unique: true,
        },
        recommendedBy: {
            type: String,
            default: 'Anonymous',
        },
        notes: {
            type: String,
            trim: true,
        },
        isWatching: {
            type: Boolean,
            default: false,
        },
        watched: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Movie', MovieSchema);
