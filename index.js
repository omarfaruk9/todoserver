const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://todoapp:OUbxpGarEMP1BHjj@cluster0.xxnck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('todoapp');
        const additemsCollection = database.collection('additems');
        const userCollection = database.collection('users');
        // console.log('connnet');

        // addItems 

        app.post('/addItem', async (req, res) => {
            const addItem = req.body;
            console.log('hitt the psot');
            const result = await additemsCollection.insertOne(addItem);
            res.send(result);
        })

        // get item 
        app.get('/item', async (req, res) => {
            const couros = additemsCollection.find({});
            const items = await couros.toArray();
            res.send(items);
        })

        app.post('/users', async (req, res) => {
            const corsor = req.body;
            const result = await userCollection.insertOne(corsor);
            res.send(result);
        })
    }
    finally {
        // client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('response from server')
})
app.listen(port, () => {
    console.log('port ', port);
})