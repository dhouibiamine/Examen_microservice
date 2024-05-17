// orderSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const orderSchema = buildSchema(`
type Query {
order(id: Int!): Order
orders: [Order]
}
type Mutation {
addOrder(customerID: String!, ticketId: String!): Order
updateOrder(id: Int!, customerID: String!, ticketId: String!): Order
deleteOrder(id: Int!): String
}
type Order {
id: Int
customerID: String
ticketId: String

}
`);
module.exports = orderSchema;