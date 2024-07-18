const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping_cart'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Get all products
app.get('/BackEnd/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get product by ID
app.get('/BackEnd/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Add item to cart
app.post('/BackEnd/api/cart', (req, res) => {
  const { productId, name, price, image, quantity } = req.body;
  const sql = 'INSERT INTO cart (productId, name, price, image, quantity) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [productId, name, price, image, quantity], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Item added to cart', id: result.insertId });
  });
});

// Get all items in cart
app.get('/BackEnd/api/cart', (req, res) => {
  const sql = 'SELECT * FROM cart';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete item from cart
app.delete('/BackEnd/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM cart WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Item removed from cart' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});