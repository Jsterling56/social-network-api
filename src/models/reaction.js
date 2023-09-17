const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    thoughtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;