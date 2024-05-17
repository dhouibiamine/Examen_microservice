const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const ticketSchema = require('./ticketSchema');
const ticketResolver = require('./ticketResolver');
const app = express();
const port = 5000;
app.use(bodyParser.json());
// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
schema: ticketSchema,
rootValue: ticketResolver,
graphiql: true
}));

// Utilisation de body-parser pour analyser les demandes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
// Implémentation de l'API REST
app.get('/tickets', (req, res) => {
db.all(`SELECT * FROM tickets`, [], (err, rows) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(rows);
});
});
app.get('/ticket/:id', (req, res) => {
db.get(`SELECT * FROM tickets WHERE id = ?`, [req.params.id], (err, row) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(row);
});
});
app.post('/ticket', (req, res) => {
const { HDep, HArri, numVol } = req.body;
db.run(`INSERT INTO tickets (HDep, HArri, numVol) VALUES (?, ?, ?)`, [HDep,
HArri, numVol], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});
app.put('/ticket/:id', (req, res) => {
    const { HDep, HArri, numVol } = req.body;
    db.run(`UPDATE tickets SET HDep = ?, HArri = ?, numVol = ? WHERE id = ?`,
    [HDep, HArri, numVol, req.params.id], (err) => {
    if (err) {
    res.status(400).json({ "error": err.message });
    return;
    }
    res.json({ "message": "success" });
    });
    });
    app.delete('/ticket/:id', (req, res) => {
    db.run(`DELETE FROM tickets WHERE id = ?`, [req.params.id], (err) => {
    if (err) {
    res.status(400).json({ "error": err.message });
    return;
    }
    res.json({ "message": "success" });
    });
    });
    // Lancement du serveur
    app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}.`);
    });