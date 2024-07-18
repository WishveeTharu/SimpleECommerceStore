// Checkout
app.post('/checkout', (req, res) => {
    const { name, address, city, state, zip, cardNumber, expiryDate, cvv } = req.body;
    const cartSql = 'SELECT * FROM cart';
  
    db.query(cartSql, (err, cartItems) => {
      if (err) throw err;
  
      const orderSql = 'INSERT INTO orders (name, address, city, state, zip, cardNumber, expiryDate, cvv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(orderSql, [name, address, city, state, zip, cardNumber, expiryDate, cvv], (err, result) => {
        if (err) throw err;
  
        const orderId = result.insertId;
  
        const orderItemsSql = 'INSERT INTO order_items (orderId, name, price, quantity, image) VALUES ?';
        const orderItems = cartItems.map(item => [orderId, item.name, item.price, item.quantity, item.image]);
  
        db.query(orderItemsSql, [orderItems], (err, result) => {
          if (err) throw err;
  
          // Clear cart
          db.query('DELETE FROM cart', (err, result) => {
            if (err) throw err;
            res.send({ message: 'Order placed successfully', orderId });
          });
        });
      });
    });
  });
  