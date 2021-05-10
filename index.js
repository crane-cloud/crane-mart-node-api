require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.NODE_API_HOST,
  port: process.env.NODE_API_PORT,
  user: process.env.NODE_API_USER,
  password: process.env.NODE_API_PASSWORD,
  database: process.env.NODE_API_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error(`Error connecting: ${error.stack}`);

    return;
  }

  console.log(`Connected as id: ${connection.threadId}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Crane Mart");
});

app.post("/products", (req, res) => {
  const sql = `INSERT INTO products (name, price) VALUES ('${req.body.name}', ${req.body.price})`;

  connection.query(sql, (error, results) => {
    if (error) throw error;

    res.status(201).send({
      id: results.insertId,
      ...req.body,
    });
  });
});

app.get("/products", (req, res) => {
  const sql = `SELECT * FROM products`;

  connection.query(sql, (error, results) => {
    if (error) throw error;

    res.status(200).send(results);
  });
});

app.get("/products/:id", (req, res) => {
  const sql = `SELECT * FROM products WHERE id = ${req.params.id}`;

  connection.query(sql, (error, results) => {
    if (error) throw error;

    res.status(200).send(results);
  });
});

app.put("/products/:id", (req, res) => {
  const sql = `UPDATE products SET name = '${req.body.name}', price = ${req.body.price} WHERE id = ${req.params.id}`;

  connection.query(sql, (error) => {
    if (error) throw error;

    res.status(200).send(req.body);
  });
});

app.delete("/products/:id", (req, res) => {
  const sql = `DELETE FROM products WHERE id = ${req.params.id}`;

  connection.query(sql, (error) => {
    if (error) throw error;

    res.status(200).send("Product deleted");
  });
});

app.listen(5000);
