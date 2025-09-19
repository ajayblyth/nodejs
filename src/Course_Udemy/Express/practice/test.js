const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./navbar-app'))

// app.get('/', (req,res)=> {
// res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// })

app.get('/about', (req,res)=> {
    res.status(200).send('about ');
})

app.all('*',(req, res)=> {
    res.status(404).send(' reource not found');
})

app.listen(5000, ()=> {
    console.log('server is running on port number 5000');
})