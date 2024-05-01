const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('User', UserSchema); //In the MongoDb, in a collection called blog there is a schema called posts