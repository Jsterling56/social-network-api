const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/my-social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection.on('connected', () =>{
    console.log('Connected to mongodb');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});