import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema";
import logger from "morgan";
import cors from "cors";


const app = express();
app.use(compression());
app.use(logger("dev"));

let username;
let password;
let databaseName;

if (process.env.NODE_ENV == 'production') {
 username = process.env.USERNAME 
 password = process.env.PASSWORD 
 databaseName = process.env.DATABASE_NAME 
} else {
  let privateConfig = require("../../privateConfig.json");
   username = privateConfig.mongoDB.userName
   password = privateConfig.mongoDB.password
   databaseName = privateConfig.mongoDB.databaseName

}


// // Temp database until Learn Postgres and sequalize/Okrrom
const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.ctnrv.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a mongodb URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => console.log("Connected to database instance."))
  .on("error", (error) => console.log("Error connecting to database:", error));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Example of Route with tsc types. Not needed for now as used as graphql API Server for now.
// app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.send({"text": "graphql Server"})
// })

app.use(cors())

// app.get("/", (req, res) => {
//   res.send("GraphQL Server");
// });


app.use(
  "/graphql",
  bodyParser.json(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

let PORT = normalizePort(process.env.PORT || '4000');


function normalizePort(val: any) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}



app.listen(PORT, () => {
  console.log(`server Running on Port ${PORT}`);
});
