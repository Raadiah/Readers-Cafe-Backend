const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongodb connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.uqio6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db('readers-cafe-db').collection('users');

    //api requests

    //users
    app.get("/users", async (req, res)=>{
        const query = userCollection.find();
        const result = await query.toArray();
        res.send(result);
    })

    app.post("/user", async (req, res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user)
        res.send(result)
    })

    //categories

    //products

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to Reader's Cafe Database!");
  } finally {
  }
}

run().catch(console.dir);

//import json data
const books = require("./data/books.json")
const featured = require("./data/featured.json")
const faq = require("./data/faq.json")

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

app.get('/featured', (req, res)=>{
    res.send(featured);
})

app.get('/faq', (req, res)=>{
    res.send(faq);
})

app.listen(port, ()=>{
    console.log(`Readers' Cafe server is running on port ${port}`);
})