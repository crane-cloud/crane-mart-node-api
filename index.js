const express = require('express');
const app = express();

app.use(express.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '196.43.134.154',
  port: '32765',
  user: 'RnExjCEdqStFhfvJ',
  password: '!bcS[[PBVN:4~nL1f9fWu(E,xQD_64GC',
  database: 'GjYAzYWSwHQJLCHxKopreHkJ'
});

connection.connect(error => {
  if (error) {
    console.error(`Error connecting: ${error.stack}`);

    return;
  }

  console.log(`Connected as id: ${connection.threadId}`);
});

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Crane Mart');
});

app.post('/products', (req, res) => {
  const sql = `INSERT INTO products (name, price) VALUES ('${req.body.name}', ${req.body.price})`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;

    res.status(201).send({
      id: results.insertId,
      ...req.body,
    });
  });
});

app.get('/products', (req, res) => {
  const sql = `SELECT * FROM products`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;

    res.status(200).send(results);
  });
});

app.get('/products/:id', (req, res) => {
  const sql = `SELECT * FROM products WHERE id = ${req.params.id}`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;

    res.status(200).send(results);
  });
});

app.post('/products/:id', (req, res) => {
  const sql = `UPDATE products SET name = '${req.body.name}', price = ${req.body.price} WHERE id = ${req.params.id}`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;

    res.status(200).send(req.body);
  });
});

app.delete('/products/:id', (req, res) => {
  const sql = `DELETE FROM products WHERE id = ${req.params.id}`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;

    res.status(200).send('Product deleted');
  });
});

app.listen(3000);