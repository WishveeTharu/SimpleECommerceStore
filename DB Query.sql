CREATE DATABASE shopping_cart;
USE shopping_cart;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Pname VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  availability VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);

INSERT INTO products (Pname, price, availability, image) VALUES
('Black Dress', 2500, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/blackDress.jpg'),
('Short Dress', 3000, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/shortDress.jpg'),
('Ladies Pijama', 2100, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/pijamaF.jpg'),
('Red Dress', 1900, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/redDress.jpg'),
('Short Dress', 2100, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/shortDress2.jpg'),
('Full Kit', 8500, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/fullkit1.jpg'),
('Full Kit', 7900, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/fullkit2.jpg'),
('Gents Pijama', 2100, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/pijamaM.jpg'),
('Tshirt', 1500, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/menTshirt.jpg'),
('Shirt', 1300, 'In Stock', 'C:/Users/HP/Documents/GitHub/codeAlpha_SimpleECommerceStore/BackEnd/FrontEnd/Images/menShirt.jpg');

CREATE TABLE `cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart TEXT NOT NULL,
    shippingInfo TEXT NOT NULL,
    paymentInfo TEXT NOT NULL,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  image VARCHAR(255) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id)
);
