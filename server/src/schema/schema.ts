
import graphql, { GraphQLSchema } from 'graphql'


import RootQueryType from './root_query_types'


export default new GraphQLSchema({
  query: RootQueryType,
});
