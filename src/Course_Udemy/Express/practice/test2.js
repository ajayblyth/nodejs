const express = require('express');
const app = express();

//module.exports = {products, people} , from dat.js file
const product = require('./data')

app.get('/', (req, res)=> {
    res.json(product)
})

app.listen(500, ()=> {
    console.log('server is running on port 500');
})