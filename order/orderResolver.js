// order.js
const db = require('./models');
// Implémentation des résolveurs GraphQL
const orderResolver = {
order: ({ id }) => {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM orders WHERE id = ?`, [id], (err, row) => {
if (err) {
reject(err);
} else {
resolve(row);
}
});
});
},
orders: () => {
return new Promise((resolve, reject) => {
db.all(`SELECT * FROM orders`, [], (err, rows) => {
if (err) {
reject(err);
} else {
resolve(rows);
}
});
});
},
addOrder: ({ customerID, ticketId}) => {
return new Promise((resolve, reject) => {
db.run(`INSERT INTO orders (customerID, ticketId) VALUES (?, ?)`,
[customerID, ticketId], function(err) {
if (err) {
reject(err);
} else {
resolve({ id: this.lastID, customerID, ticketId });
}
});
});
},
updateOrder: ({ id,customerID, ticketId }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE orders SET customerID = ?, ticketId = ? WHERE id = ?',
        [customerID, ticketId, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, customerID, ticketId});
          }
        }
      );
    });
  },

deleteOrder: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM orders WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(`Client avec l'ID ${id} supprimé.`);
        }
      });
    });
  }
};
module.exports = orderResolver;