import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema";
import logger from "morgan";
let privateConfig = require("../../privateConfig.json");

const app = express();
app.use(compression());
app.use(logger("dev"));

// // Temp database until Learn Postgres and sequalize/Okrrom
const MONGO_URI = `mongodb+srv://${privateConfig.mongoDB.userName}:${privateConfig.mongoDB.password}@cluster0.ctnrv.mongodb.net/${privateConfig.mongoDB.databaseName}?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => console.log("Connected to MongoDb instance."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Example of Route with tsc types. Not needed for now as used as graphql API Server for now.
// app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.send({"text": "graphql Server"})
// })

// app.get("/", (req, res) => {
//   res.send("GraphQL Server");
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

let PORT = 4000;

app.listen(PORT, () => {
  console.log(`server Running on Port ${PORT}`);
});
