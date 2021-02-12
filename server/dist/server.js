"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./schema/schema"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(compression_1.default());
app.use(morgan_1.default("dev"));
let username;
let password;
let databaseName;
if (process.env.NODE_ENV == 'production') {
    username = process.env.USERNAME;
    password = process.env.PASSWORD;
    databaseName = process.env.DATABASE_NAME;
}
else {
    let privateConfig = require("../../privateConfig.json");
    username = privateConfig.mongoDB.userName;
    password = privateConfig.mongoDB.password;
    databaseName = privateConfig.mongoDB.databaseName;
}
// // Temp database until Learn Postgres and sequalize/Okrrom
const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.ctnrv.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
if (!MONGO_URI) {
    throw new Error("You must provide a mongodb URI");
}
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose_1.default.connection
    .once("open", () => console.log("Connected to database instance."))
    .on("error", (error) => console.log("Error connecting to database:", error));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
// Example of Route with tsc types. Not needed for now as used as graphql API Server for now.
// app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.send({"text": "graphql Server"})
// })
app.use(cors_1.default());
// app.get("/", (req, res) => {
//   res.send("GraphQL Server");
// });
app.use("/graphql", body_parser_1.default.json(), express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true,
}));
let PORT = normalizePort(process.env.PORT || 4000);
function normalizePort(val) {
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
//# sourceMappingURL=server.js.map