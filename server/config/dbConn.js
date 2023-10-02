const mongoose = require('mongoose');

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            dbName: 'movieRecsDB',
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connetDB;
