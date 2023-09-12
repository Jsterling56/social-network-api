const express = require('express');
const router = express.Router();
const User = require('..models/user');

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

//get a single thought by ID
router.get('/thoughts/:thoughtId', async (req, res) => {
    try{
        const thought = await Thought.findById(req.params.thoughtId);
        if(!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

//get thoughts by a specific user
router.get('/thoughts/user/:userId', async (req, res) =>{
    try {
        const userId = req.params.userId;
        const thoughts = await Thought.find({ author: userId });
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

module.exports = router;

