const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moonlightstudio'
})


app.get('/', (req, res) => {
    return res.json('From backend side');
});

app.get('/stylists', (req, res) => {
    const sql = "SELECT * FROM stylists";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/stylists/haircut', (req, res) => {
    const sql = "SELECT * FROM stylists WHERE `service` = 'haircut'";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/stylists/straightening', (req, res) => {
    const sql = "SELECT * FROM stylists WHERE `service` = 'straightening'";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/stylists/perm', (req, res) => {
    const sql = "SELECT * FROM stylists WHERE `service` = 'perm'";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})


app.listen(8081, () => {
    console.log('Listening on port 8081');
})