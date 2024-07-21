-- Create the database
CREATE DATABASE IF NOT EXISTS shopping_cart;
USE shopping_cart;

-- Create `products` table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    stock INT
);

-- Create `cart` table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    quantity INT NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id)
);

-- Create `orders` table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    cardNumber VARCHAR(20) NOT NULL,
    expiryDate VARCHAR(10) NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create `order_items` table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (orderId) REFERENCES orders(id)
);

-- Insert sample data into `products`
INSERT INTO products (name, description, price, image, stock) VALUES
('Laptop', 'High-performance laptop with 16GB RAM', 999.99, 'laptop.jpg', 10),
('Smartphone', 'Latest model with 128GB storage', 699.99, 'smartphone.jpg', 20),
('Headphones', 'Noise-cancelling over-ear headphones', 199.99, 'headphones.jpg', 15),
('Smartwatch', 'Smartwatch with heart rate monitor', 129.99, 'smartwatch.jpg', 25);

-- Insert sample data into `cart`
INSERT INTO cart (productId, name, price, image, quantity) VALUES
(1, 'Laptop', 999.99, 'laptop.jpg', 1),
(2, 'Smartphone', 699.99, 'smartphone.jpg', 2),
(3, 'Headphones', 199.99, 'headphones.jpg', 1);

-- Insert sample data into `orders`
INSERT INTO orders (name, address, city, state, zip, cardNumber, expiryDate, cvv) VALUES
('John Doe', '123 Elm Street', 'Springfield', 'IL', '62701', '4111111111111111', '12/24', '123'),
('Jane Smith', '456 Oak Avenue', 'Metropolis', 'NY', '10001', '5222222222222222', '06/25', '456');

-- Insert sample data into `order_items`
INSERT INTO order_items (orderId, name, price, quantity, image) VALUES
(1, 'Laptop', 999.99, 1, 'laptop.jpg'),
(1, 'Headphones', 199.99, 1, 'headphones.jpg'),
(2, 'Smartphone', 699.99, 2, 'smartphone.jpg');
