const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// create a new post
router.post('/posts', async (req, res) => {
    try {
        const { content, author } = req.body;
        const newPost = new Post({
            content,
            author,
        });
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
    }
});

//update a post by ID
router.put('/posts/:postId', async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' })
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

//delete a post by ID
router.delete('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const deletedPost = await Post.findByIdAndRemove(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;