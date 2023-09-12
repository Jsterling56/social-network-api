const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('.src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');

mongoose.connect('mongodb://localhost:27017/my-social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection.on('connected', () =>{
    console.log('Connected to mongodb');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactioRoutes);

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