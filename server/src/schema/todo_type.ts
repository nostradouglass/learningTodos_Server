import mongoose from "mongoose";
import graphql, { GraphQLBoolean, GraphQLInt } from "graphql";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";

const TodoType: GraphQLObjectType<string, () => object> = new GraphQLObjectType(
  {
    name: "TodoType",
    fields: () => ({
      id: { type: GraphQLID },
      todoItem: { type: GraphQLString },
      completed: { type: GraphQLBoolean },
      percentComplete: { type: GraphQLInt },
      notes: { type: GraphQLString },
      officalTechName: { type: GraphQLString },
      websiteUrl: { type: GraphQLString },
    }),
  }
);

export default TodoType;
