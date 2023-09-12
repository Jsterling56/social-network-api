const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    createdAt: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Post', postSchema);