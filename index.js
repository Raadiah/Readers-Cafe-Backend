const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//import json data
const books = require("./data/books.json")

//APIs
app.get('/', (req, res)=>{
    res.send("Readers' Cafe Server is running")
})

app.get('/books', (req, res)=>{
    res.send(books);
})

app.get('/book/:id', (req, res)=>{
    const bookId = req.params.id;
    const book = books.find((book) => book.bookId == bookId);
    res.send(book);
})

app.listen(port, ()=>{
    console.log(`Readers' Cafe server is running on port ${port}`);
})