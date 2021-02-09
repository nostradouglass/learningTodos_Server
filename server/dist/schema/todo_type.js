"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const TodoType = new graphql_2.GraphQLObjectType({
    name: "TodoType",
    fields: () => ({
        id: { type: graphql_2.GraphQLID },
        todoItem: { type: graphql_2.GraphQLString },
        completed: { type: graphql_1.GraphQLBoolean },
        percentComplete: { type: graphql_1.GraphQLInt },
        notes: { type: graphql_2.GraphQLString },
    }),
});
exports.default = TodoType;
//# sourceMappingURL=todo_type.js.map