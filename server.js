const express = require('express');
const path = require('path');
const server = express();
const db = require('./db')('./products.json', () => {})

server.use(express.json());

server.use(express.static(__dirname));

server.get('/', (request, response, next) => {

    response.sendFile(path.join(__dirname, './index.html'))
})

server.get('/api/products', async (request, response, next) => {

    response.send(await db.findAll())
})

server.post('/api/products', async(req, res, next) => {
    res.send(await db.create(req.body));
})

server.delete('/api/products/:id', async (req, res, next) => {
    res.send(await db.destroy(req.params.id));
})

server.listen(3000, () => {
    console.log('application started')
})
