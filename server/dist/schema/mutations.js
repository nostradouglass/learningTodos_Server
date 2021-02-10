"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const graphql_1 = require("graphql");
const mongoose_1 = __importDefault(require("mongoose"));
//import Todo from '../models/todo'
const todo_type_1 = __importDefault(require("./todo_type"));
const Todo = mongoose_1.default.model("todo");
exports.mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addTodo: {
            type: todo_type_1.default,
            args: {
                todoItem: { type: graphql_1.GraphQLString },
                completed: { type: graphql_1.GraphQLBoolean },
                percentComplete: { type: graphql_1.GraphQLInt },
                notes: { type: graphql_1.GraphQLString }
            },
            resolve(parentValue, { todoItem, completed, percentComplete, notes }) {
                return new Todo({ todoItem, completed, percentComplete, notes }).save();
            },
        },
        changeCompleted: {
            type: todo_type_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
                completed: { type: graphql_1.GraphQLBoolean },
            },
            resolve(parentValue, { id, completed }) {
                return Todo.findOneAndUpdate({ _id: id }, { completed: completed }, { new: true });
            },
        },
        changePercentCompleteSong: {
            type: todo_type_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
                percentComplete: { type: graphql_1.GraphQLInt },
            },
            resolve(parentValue, { id, percentComplete }) {
                return Todo.findOneAndUpdate({ _id: id }, { percentComplete: percentComplete }, { new: true });
            },
        },
        addNotes: {
            type: todo_type_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
                notes: { type: graphql_1.GraphQLString },
            },
            resolve(parentValue, { id, notes }) {
                return Todo.findOneAndUpdate({ _id: id }, { notes: notes }, { new: true });
            },
        },
        removedTodo: {
            type: todo_type_1.default,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parentValue, { id }) {
                return Todo.findByIdAndDelete({ _id: id });
            },
        },
    },
});
//# sourceMappingURL=mutations.js.map