const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL root password
    database: 'ecommerce'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/products', (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Seed database (run once)
app.get('/seed', (req, res) => {
    const products = [
        { name: 'Product 1', description: 'Black Dress', price: 10, image: 'images/blackDress.jpeg' },
        { name: 'Product 2', description: 'Short Dress', price: 20, image: 'images/shortDress.jpeg' },
        { name: 'Product 3', description: 'Pijama', price: 30, image: 'images/pijama.jpeg' },
        { name: 'Product 4', description: 'Red Dress', price: 40, image: 'images/redDress.jpeg' },
        { name: 'Product 5', description: 'Short Dress2', price: 50, image: 'images/shortDress2.jpeg' },
        { name: 'Product 6', description: 'Full Kit1', price: 60, image: 'images/fullkit1.jpeg' },
        { name: 'Product 7', description: 'Full Kit2', price: 70, image: 'images/fullkit2.jpeg' },
        { name: 'Product 8', description: 'Men Tshirt', price: 80, image: 'images/menTshirt.jpeg' },
    ];
    const query = 'INSERT INTO products (name, description, price, image) VALUES ?';
    const values = products.map(product => [product.name, product.description, product.price, product.image]);

    connection.query(query, [values], (err, results) => {
        if (err) {
            console.error('Error seeding database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.send('Database seeded');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
