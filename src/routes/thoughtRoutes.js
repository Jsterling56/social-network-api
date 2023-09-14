const express = require('express');
const router = express.Router();
// const User = require('..models/thought.js');

// create new thought - post
router.post('/', async (req, res) => {
    try {
        const { content, author } = req.body;

        const newThought = new Thought({
            content,
            author,
        });
        const savedThought = await newThought.save();
        res.status(201).json(savedThought);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
});

// get all thoughts - get
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

// update thought by id - put
router.put('/:thoughtId', async (req, res) => {
    try {
        const { content } = req.body;
        const { thoughtId } = req.params;

        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { content },
            { new: true },
        );
        if (!updatedThought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete thought by id - delete
router.delete('/:thoughtId', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const deletedThought = await Thought.findByIdAndRemove(thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(deletedThought);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get a single thought by ID
router.get('/thoughts/:thoughtId', async (req, res) => {
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