const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

//image id sha256:5d7318118c6e88dd814d432cbb6088cf4956873f6f497a56c987e6
//or villacodes/posts
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const {title} = req.body;
    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    console.log(title);

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);
    
    res.send({})
});

app.listen(4000, () => {
    console.log('V2');
    console.log('Listening on 4000');
});