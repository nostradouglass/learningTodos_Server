import graphql, {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import mongoose from "mongoose";

//import Todo from '../models/todo'
import TodoType from "./todo_type";
const Todo = mongoose.model("todo");

export const mutation: GraphQLObjectType<
  string,
  () => object
> = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        todoItem: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        percentComplete: { type: GraphQLInt },
        notes: { type: GraphQLString },
        officalTechName: { type: GraphQLString },
        websiteUrl: { type: GraphQLString },
      },
      resolve(
        parentValue,
        {
          todoItem,
          completed,
          percentComplete,
          notes,
          officalTechName,
          websiteUrl,
        }
      ) {
        return new Todo({
          todoItem,
          completed,
          percentComplete,
          notes,
          officalTechName,
          websiteUrl,
        }).save();
      },
    },
    changeCompleted: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        completed: { type: GraphQLBoolean },
      },
      resolve(parentValue, { id, completed }) {
        return Todo.findOneAndUpdate(
          { _id: id },
          { completed: completed },
          { new: true }
        );
      },
    },
    changePercentCompleteSong: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        percentComplete: { type: GraphQLInt },
      },
      resolve(parentValue, { id, percentComplete }) {
        return Todo.findOneAndUpdate(
          { _id: id },
          { percentComplete: percentComplete },
          { new: true }
        );
      },
    },
    addNotes: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        notes: { type: GraphQLString },
      },
      resolve(parentValue, { id, notes }) {
        return Todo.findOneAndUpdate(
          { _id: id },
          { notes: notes },
          { new: true }
        );
      },
    },
    removedTodo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Todo.findByIdAndDelete({ _id: id });
      },
    },
  },
});
