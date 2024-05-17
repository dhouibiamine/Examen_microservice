// customer.js
const db = require("./models");

const customerResolver = {
  customer: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM customers WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  customers: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM customers`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  addCustomer: ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO customers (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, name, email, password });
          }
        }
      );
    });
  },
  updateCustomer: ({ id, name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE customers SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name, email, password });
          }
        }
      );
    });
  },

  deleteCustomer: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM customers WHERE id = ?`, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(`Client avec l'ID ${id} supprimé.`);
        }
      });
    });
  },
};
module.exports = customerResolver;
