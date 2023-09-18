const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought.js');
const User = require('../models/user.js');

// create new thought - post
router.post('/api/thought/create', async (req, res) => {
    try {
        const { content, username } = req.body;
        if (!content || !username ) {
            return res.status(400).json({ error: 'Missing content or user' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Missing user'});
        }

        const newThought = new Thought({
            content,
            username,
        });

        user.thoughts.push(newThought);

        const savedThought = await newThought.save();
        await user.save();
        res.status(201).json(savedThought);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get all thoughts - get
router.get('/api/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

//get a single thought by ID
router.get('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});


module.exports = router;