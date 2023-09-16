const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');


//create a new user - POST
router.post('/api/users/create', async (req, res) => {
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

//get all users - GET
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get user by ID - GET
router.get('/api/users/:userId', async (req, res) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update a user by ID - PUT
router.put('/api/update/:userId', async (req, res) => {
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
router.delete('/api/deleteUser/:userId', async (req, res) => {
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




// add a friend to a user's friend list
router.post('/api/addFriend/:userID/:friendId', async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }
        user.friends.push(friendId);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// remove a friend from a user's friend list
router.delete('/:userId/removeFriend/:friendId', async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

