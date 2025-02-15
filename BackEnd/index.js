const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "shopping_cart",
  port: "3306", // Update to default port 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Shopping Cart');
});

// Get all products
app.get("/BackEnd/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get all product images
app.get('/BackEnd/api/productImages', (req, res) => {
  const sql = 'SELECT image FROM products';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get product by ID
app.get("/BackEnd/api/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Add item to cart
app.post("/BackEnd/api/cart", (req, res) => {
  console.log(req.body); // Log the request body for debugging

  const { productId, name, price, image, quantity } = req.body;
  if (!productId || !name || !price || !image || !quantity) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO cart (productId, name, price, image, quantity) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [productId, name, price, image, quantity], (err, result) => {
    if (err) throw err;
    res.send({ message: "Item added to cart", id: result.insertId });
  });
});

// Get all items in cart
app.get("/BackEnd/api/cart", (req, res) => {
  const sql = "SELECT * FROM cart";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete item from cart
app.delete("/BackEnd/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cart WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: "Item removed from cart" });
  });
});

// Delete all items from cart
app.delete('/BackEnd/api/cart', (req, res) => {
  const sql = 'DELETE FROM cart';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Database error:', err);
          return res.send({ success: false, message: 'Error clearing the cart' });
      }
      res.send({ success: true, message: 'Cart cleared successfully' });
  });
});

// Update item quantity in cart
app.put("/BackEnd/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const sql = "UPDATE cart SET quantity = ? WHERE id = ?";
  db.query(sql, [quantity, id], (err, result) => {
    if (err) {
      res.status(400).send({ success: false, message: 'Error updating cart item quantity' });
      throw err;
    }
    res.send({ success: true, message: 'Cart item quantity updated' });
  });
});

// User login
app.post('/BackEnd/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ success: true, message: 'Login successful' });
    } else {
      res.send({ success: false, message: 'Unregistered customer. Please Sign Up' });
    }
  });
});

// User signup
app.post('/BackEnd/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      res.send({ success: false, message: 'Error during sign up' });
      throw err;
    }
    res.send({ success: true, message: 'Sign up successful' });
  });
});

// Handle order submission
app.post('/BackEnd/api/checkout', (req, res) => {
  const { cart, shippingInfo, paymentInfo } = req.body;

  // Check if all required fields are provided
  if (!cart || !shippingInfo || !paymentInfo) {
      return res.send({ success: false, message: 'Missing required order information' });
  }

  // Insert order into database
  const sql = 'INSERT INTO orders (cart, shippingInfo, paymentInfo) VALUES (?, ?, ?)';
  db.query(sql, [JSON.stringify(cart), JSON.stringify(shippingInfo), JSON.stringify(paymentInfo)], (err, result) => {
      if (err) {
          console.error('Database error:', err);  // Log the detailed error
          return res.send({ success: false, message: 'Error during order submission' });
      }
      res.send({ success: true, message: 'Order submitted successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});