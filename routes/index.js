const express = require('express');
const router = express.Router();

const productsRoutes = require('./products');
const ordersRoutes = require('./orders');
const usersRoutes = require('./users');

router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/users', usersRoutes);

module.exports = router;