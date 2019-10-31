const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

const User = require('../models/User');
const Event = require('../models/Event');

class DBService {
    async init() {
        try {
            await mongoose.connect(DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

            User.init();
            Event.init();

            console.log('Successfully established database connection');
        } catch (err) {
            console.error('Failed to established database connection: ' + err.message);
            process.exit(1);
        }
    }
}

module.exports = new DBService();