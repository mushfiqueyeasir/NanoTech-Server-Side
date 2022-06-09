const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { get } = require('express/lib/response');
const port = process.env.PORT || 5000;
const app = express();


//middleware
app.use(cors());
app.use(express.json())
const secret = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secret);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emmtc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// Java Web Token Verifys
function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access!' })
        }
        req.decoded = decoded;
        next();
    })
}



async function run() {

    try {
        await client.connect();

        const partsCollection = client.db('NanoTEch').collection('parts');
        const reviewsCollection = client.db('NanoTEch').collection('reviews');
        const usersCollection = client.db('NanoTEch').collection('users');
        const orderCollection = client.db('NanoTEch').collection('orders');


        // Payment Getway
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const service = req.body;
            const price = service.price;
            const amount = price * 10;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card'],
            });
            res.send({
                clientSecret: paymentIntent.client_secret
            });
        });



        // Verify admin role
        const verifyAdmin = async (req, res, next) => {
            const requester = req.decoded.email;
            const requestAccount = await usersCollection.findOne({ email: requester });

            if (requestAccount.role === 'admin') {
                {
                    next();
                }
            } else {
                res.status(403).send({ message: 'Forbidden Access' });
            }
        }

        //----------------- Parts API------------------------
        // ADD Parts
        app.post('/parts', verifyJWT, verifyAdmin, async (req, res) => {
            const parts = req.body;
            const result = await partsCollection.insertOne(parts);
            res.send(result);
        })

        //Get all Parts
        app.get('/parts', async (req, res) => {
            const query = {};
            const cursor = partsCollection.find(query);
            const parts = await cursor.toArray();
            res.send(parts);
        })

        //Get  specific parts
        app.get('/parts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const parts = await partsCollection.findOne(query);
            res.send(parts)
        })
        // Update Order
        app.put('/parts/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const parts = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: parts,
            };
            const result = await partsCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //Remove Parts
        app.delete('/parts/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await partsCollection.deleteOne(filter)
            res.send(result);
        })

        //----------------- Parts API------------------------

        //----------------- Reviews API------------------------

        // ADD Reviews
        app.post('/reviews', verifyJWT, async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.send(result);
        })

        //Get all Reviews
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewsCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })

        //Get  specific REviews
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const reviews = await reviewsCollection.findOne(query);
            res.send(reviews)
        })

        //----------------- Reviews API------------------------

        //----------------- User API------------------------

        // ADD User to the Database 
        app.put('/users/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
            res.send({ result, token });
        })

        // Get All User
        app.get('/users', verifyJWT, async (req, res) => {
            const users = await usersCollection.find().toArray();
            res.send(users);
        })

        // Get specific User
        app.get('/users/:email', verifyJWT, async (req, res) => {
            const email = req.params.email
            const users = await usersCollection.find({ email: email }).toArray();
            res.send(users);
        })

        // Make Admin
        app.put('/users/admin/:email', verifyJWT, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { role: 'admin' },
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // Check Admin
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const user = await usersCollection.findOne({ email: email });
            const isAdmin = user.role == 'admin';
            res.send({ admin: isAdmin })
        })


        //Remove User
        app.delete('/users/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter)
            res.send(result);
        })

        //----------------- User API------------------------


        //----------------- Order API------------------------

        // Add Orders
        app.post('/orders', verifyJWT, async (req, res) => {
            const result = await orderCollection.insertOne(req.body);
            res.send(result);
        })

        // Update Order
        app.put('/orders/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const orders = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: orders,
            };
            const result = await orderCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // Get all Order
        app.get('/orders', verifyJWT, verifyAdmin, async (req, res) => {
            const orders = await orderCollection.find().toArray();
            res.send(orders);
        })


        // Get all Order
        app.get('/orders/payment/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await orderCollection.findOne(query);
            res.send(order)
        })


        // Get specific User's Order
        app.get('/orders/:email', verifyJWT, async (req, res) => {
            const email = req.params.email
            const orders = await orderCollection.find({ email: email }).toArray();
            res.send(orders);
        })

        //Remove Order
        app.delete('/orders/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(filter)
            res.send(result);
        })

        //----------------- Order API------------------------

    }
    finally {

    }


}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from NanoTEch')
})

app.listen(port, () => {
    console.log(`NanoTEch  Server is running on port ${port}`);
})