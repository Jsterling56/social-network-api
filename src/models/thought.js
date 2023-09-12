const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        trpe: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Thought', thoughtSchema);