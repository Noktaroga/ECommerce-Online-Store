const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { ensureAuthenticated } = require('../config/passport');

// Ruta para mostrar el carrito de compras (requiere autenticación)
router.get('/', ensureAuthenticated, cartController.getCart);

// Ruta para agregar un producto al carrito (requiere autenticación)
router.post('/add-to-cart', ensureAuthenticated, cartController.postAddToCart);

// Ruta para eliminar un producto del carrito (requiere autenticación)
router.post('/remove-from-cart', ensureAuthenticated, cartController.postRemoveFromCart);

// Ruta para vaciar el carrito (requiere autenticación)
router.post('/clear-cart', ensureAuthenticated, cartController.postClearCart);

// Ruta para el proceso de compra (checkout) (requiere autenticación)
router.get('/checkout', ensureAuthenticated, cartController.getCheckout);

// Ruta para realizar el pedido (requiere autenticación)
router.post('/place-order', ensureAuthenticated, cartController.postPlaceOrder);

module.exports = router;
