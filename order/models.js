const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./database.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "orderss"
db.run(`CREATE TABLE IF NOT EXISTS orders (
id INTEGER PRIMARY KEY AUTOINCREMENT,
customerID TEXT NOT NULL,
ticketId TEXT NOT NULL 
)`);
// Modèle de données pour représenter un utilisateur
class Order {
constructor(customerID, ticketId) {
this.customerID = customerID;
this.ticketId = ticketId;

}
// Enregistrer un nouvel utilisateur dans la base de données
save(callback) {
db.run(`INSERT INTO orders (customerID, ticketId) VALUES (?, ?)`,
[this.customerID, this.ticketId], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Utilisateur ${this.customerID} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les utilisateurs dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM orders`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const orders = rows.map(row => new Order(row.customerID, row.ticketId));
callback(null, orders);
});
}
// Rechercher un utilisateur par ID dans la base de données
static findById(id, callback) {
    db.get(`SELECT * FROM orders WHERE id = ?`, [id], function(err, row) {
    if (err) {
    console.error(err.message);
    return callback(err);
    }
    if (!row) {
    return callback(new Error('Utilisateur non trouvé'));
    }
    const order = new Order(row.customerID, row.ticketId);
    callback(null, order);
    });
    }
    // Mettre à jour un utilisateur dans la base de données
    static updateById(id, customerID, ticketId,  callback) {
    db.run(`UPDATE orders SET customerID = ?, ticketId = ? WHERE id = ?`,
    [customerID, ticketId, id], function(err) {
    if (err) {
    console.error(err.message);
    return callback(err);
    }
    console.log(`Utilisateur avec l'ID ${id} mis à jour.`);
    callback(null);
    });
    }
    // Supprimer un utilisateur de la base de données
    static deleteById(id, callback) {
    db.run(`DELETE FROM orders WHERE id = ?`, [id], function(err) {
    if (err) {
    console.error(err.message);
    return callback(err);
    }
    console.log(`Utilisateur avec l'ID ${id} supprimé.`);
    callback(null);
    });
    }
    }
    module.exports = db;