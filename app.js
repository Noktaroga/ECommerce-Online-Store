const express = require('express');
const app = express();
const path = require('path');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');


app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;
