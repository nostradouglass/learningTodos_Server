"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
let privateConfig = require('../../privateConfig.json');
const app = express_1.default();
app.use(compression_1.default);
// Temp database until Learn Postgres and sequalize/Okrrom
const MONGO_URI = `mongodb+srv://${privateConfig.mongoDB.userName}:${privateConfig.mongoDB.password}@cluster0.ctnrv.mongodb.net/${privateConfig.mongoDB.databaseName}?retryWrites=true&w=majority`;
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose_1.default.connection
    .once('open', () => console.log('Connected to MongoDb instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server Running on Port ${PORT}`);
});
