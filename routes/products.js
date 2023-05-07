const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Aquí irán las rutas de este archivo
router.get('/', productController.index);
router.get('/new', productController.new);
router.get('/:id', productController.show);
router.get('/:id/edit', productController.edit);

module.exports = router;






