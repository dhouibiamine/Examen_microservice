const sqlite3 = require("sqlite3").verbose();
// Connexion la base de données
let db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Base de données connectée.");
});
// Création de la table "tickets"
db.run(`CREATE TABLE IF NOT EXISTS tickets (
id INTEGER PRIMARY KEY AUTOINCREMENT,
HDep TEXT NOT NULL,
HArri TEXT NOT NULL,
numVol TEXT NOT NULL UNIQUE

)`);
// Modèle de données pour représenter un utilisateur
class Ticket {
  constructor(HDep, HArri, numVol) {
    this.HDep = HDep;
    this.HArri = HArri;
    this.numVol = numVol;
  }
  // Enregistrer un nouvel utilisateur dans la base de données
  save(callback) {
    db.run(
      `INSERT INTO tickets (HDep, HArri, numVol) VALUES (?, ?, ?)`,
      [this.HDep, this.HArri, this.numVol],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Utilisateur ${this.HDep} ajouté avec l'ID ${this.lastID}`);
        callback(null, this.lastID);
      }
    );
  }
  // Rechercher tous les utilisateurs dans la base de données
  static findAll(callback) {
    db.all(`SELECT * FROM tickets`, [], function (err, rows) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const tickets = rows.map(
        (row) => new Ticket(row.HDep, row.HArri, row.numVol)
      );
      callback(null, tickets);
    });
  }
  // Rechercher un utilisateur par ID dans la base de données
  static findById(id, callback) {
    db.get(`SELECT * FROM tickets WHERE id = ?`, [id], function (err, row) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      if (!row) {
        return callback(new Error("Utilisateur non trouvé"));
      }
      const ticket = new Ticket(row.HDep, row.HArri, row.numVol);
      callback(null, ticket);
    });
  }
  // Mettre à jour un utilisateur dans la base de données
  static updateById(id, HDep, HArri, numVol, callback) {
    db.run(
      `UPDATE tickets SET HDep = ?, HArri = ?, numVol = ? WHERE id = ?`,
      [HDep, HArri, numVol, id],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Utilisateur avec l'ID ${id} mis à jour.`);
        callback(null);
      }
    );
  }
  // Supprimer un utilisateur de la base de données
  static deleteById(id, callback) {
    db.run(`DELETE FROM tickets WHERE id = ?`, [id], function (err) {
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
