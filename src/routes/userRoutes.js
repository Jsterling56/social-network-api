const express = require('express');
const router = express.Router();
const User = require('..models/user');

//create a new user - POST
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        const newUser = new User({
            username,
            email,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// update a user by ID - PUT
router.put('/:userId', async (req, res) => {
    try {
        const { username, email } = req.body;
        const { userId } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete a user by ID
router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndRemove(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//get all users - GET
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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

