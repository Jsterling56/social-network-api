const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./src/routes/userRoutes');
const thoughtRoutes = require('./src/routes/thoughtRoutes');
const reactionRoutes = require('./src/routes/reactionRoutes');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/', thoughtRoutes);
app.use('/', reactionRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//friends: remove, add
// users: delete, update, find all, find user by id, create user, create second user, create third user
// reactions: remove, create
// thoughts: create thought, remove thought