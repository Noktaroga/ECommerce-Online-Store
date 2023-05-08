const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Aquí irán las rutas de este archivo
router.get('/', productController.list);
router.get('/create', productController.create);
router.post('/create', productController.store);
router.get('/:id', productController.show);
router.get('/:id/edit', productController.edit);
router.put('/:id/edit', productController.update);
router.delete('/:id/delete', productController.delete);

module.exports = router;
