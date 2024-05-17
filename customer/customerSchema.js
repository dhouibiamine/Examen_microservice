// customerSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const customerSchema = buildSchema(`
type Query {
customer(id: Int!): Customer
customers: [Customer]
}
type Mutation {
addCustomer(name: String!, email: String!, password: String!): Customer
updateCustomer(id: Int!, name: String!, email: String!, password: String!): Customer
deleteCustomer(id: Int!): String
}
type Customer {
id: Int
name: String
email: String
password: String
}
`);
module.exports = customerSchema;