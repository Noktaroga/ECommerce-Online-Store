const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ruta para mostrar todas las órdenes
router.get('/', orderController.getOrders);

// Ruta para mostrar los detalles de una orden específica
router.get('/:id', orderController.getOrder);

// Ruta para mostrar el formulario de edición de una orden existente
router.get('/:id/edit', orderController.getEditOrder);

// Ruta para actualizar una orden existente
router.post('/:id/edit', orderController.postEditOrder);

// Ruta para eliminar una orden existente
router.post('/:id/delete', orderController.postDeleteOrder);

module.exports = router;
