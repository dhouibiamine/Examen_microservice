const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const db = require("./models");
const customerSchema = require("./customerSchema");
const customerResolver = require("./customerResolver");
const app = express();
const port = 5001;
app.use(bodyParser.json());
// Utilisation de GraphQL pour gérer les requêtes
app.use(
  "/graphql",
  graphqlHTTP({
    schema: customerSchema,
    rootValue: customerResolver,
    graphiql: true,
  })
);

// Utilisation de body-parser pour analyser les demandes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
// Implémentation de l'API REST
app.get("/customers", (req, res) => {
  db.all(`SELECT * FROM customers`, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
app.get("/customer/:id", (req, res) => {
  db.get(
    `SELECT * FROM customers WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    }
  );
});
app.post("/customer", (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    `INSERT INTO customers (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "success" });
    }
  );
});
app.put("/customer/:id", (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    `UPDATE customers SET name = ?, email = ?, password = ? WHERE id = ?`,
    [name, email, password, req.params.id],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "success" });
    }
  );
});
app.delete("customer/:id", (req, res) => {
  db.run(`DELETE FROM customers WHERE id = ?`, [req.params.id], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success" });
  });
});
// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}.`);
});
