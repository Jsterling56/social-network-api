const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    reactions: [{
        type: mongoose.Schema.Types.String,
        ref: 'Reaction',

    }],
});

module.exports = mongoose.model('Thought', thoughtSchema);