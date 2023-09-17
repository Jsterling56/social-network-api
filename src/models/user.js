const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }]
});

module.exports = mongoose.model('User', userSchema);