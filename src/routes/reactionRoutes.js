const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

//create a reaction - post
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const { reactionBody, username } = req.body;
        const { thoughtId } = req.params;

        const thought = await Thought.findByIdAndUpdate(thoughtId, { $addToSet: { reactions: reactionBody, username: username } });
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        

        await thought.save();
        res.status(201).json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete a reactionby ID - delete
router.delete( '/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        const removedReactionIndex = thought.reactions.findIndex(
            (reaction) => reaction._id.toString() === reactionId
        );
        if (removedReactionIndex === -1) {
            return res.status(404).json({ error: 'Reaction not found' });
        }

        thought.reactions.splice(removedReactionIndex, 1);
        await thought.save();
        res.json(thought);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;