/**/const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/*// Ruta para mostrar la vista de creación de órdenes
router.get('/orders/create', orderController.showCreateOrder);

// Ruta para crear una nueva orden
router.post('/orders', orderController.createOrder);

// Ruta para mostrar la vista de órdenes de un usuario
router.get('/users/:id_usuario/orders', orderController.showListOrders);

// Ruta para mostrar la vista de actualización de órdenes
router.get('/orders/:id/update', orderController.showUpdateOrderStatus);

// Ruta para actualizar el estado de una orden
router.put('/orders/:id', orderController.updateOrderStatus);
*/
module.exports = router;
