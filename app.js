const express = require('express');
const app = express();
const path = require('path');

app.use(function(req, res, next) {
    console.log('Request:', req.method, req.url, req.body);
    next();
});  

app.use(express.json()); //No utilizado porque no es necesario manejar nada con json
app.use(express.urlencoded({ extended: true }));

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;
