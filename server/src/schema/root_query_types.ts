import mongoose from 'mongoose'
import graphql, { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'

import Todo from '../models/todo'
import TodoType from './todo_type'


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // todos: {
    //   type: new GraphQLList(TodoType),
    //   resolve() {
    //     return Todo.find({});
    //   }
    // },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return Todo.findById(id);
      }
    },
   
  })
});

export default RootQuery;
