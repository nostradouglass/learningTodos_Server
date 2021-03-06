"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const todo_1 = __importDefault(require("../models/todo"));
const todo_type_1 = __importDefault(require("./todo_type"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        todos: {
            type: new graphql_1.GraphQLList(todo_type_1.default),
            resolve() {
                return todo_1.default.find({});
            },
        },
        todo: {
            type: todo_type_1.default,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parentValue, { id }) {
                return todo_1.default.findById(id);
            },
        },
    }),
});
exports.default = RootQuery;
//# sourceMappingURL=root_query_types.js.map