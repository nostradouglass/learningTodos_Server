import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import {} from 'express-graphql'
import mongoose from 'mongoose'
let privateConfig = require('../../privateConfig.json')

const app = express()

app.use(compression)

// Temp database until Learn Postgres and sequalize/Okrrom
const MONGO_URI = `mongodb+srv://${privateConfig.mongoDB.userName}:${privateConfig.mongoDB.password}@cluster0.ctnrv.mongodb.net/${privateConfig.mongoDB.databaseName}?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .once('open', () => console.log('Connected to MongoDb instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000

app.listen(PORT, () => {
    console.log(`server Running on Port ${PORT}`)
})

