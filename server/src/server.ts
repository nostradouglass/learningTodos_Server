import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import {} from 'express-graphql'

const app = express()

app.use(compression)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000

app.listen(PORT, () => {
    console.log(`server Running on Port ${PORT}`)
})

