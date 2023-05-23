const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multerconfig'); // Importar el middleware de Multer directamente


// Aquí irán las rutas de este archivo
router.get('/', productController.list);
router.get('/create', productController.create);
//router.post('/create', productController.store);
router.post('/create', upload.single('imagen'), productController.store);
router.get('/:id(\\d+)', productController.show);
router.get('/:id(\\d+)/edit', productController.edit);
//router.post('/:id(\\d+)', productController.update);
router.post('/:id(\\d+)', upload.single('imagen'), productController.update);
router.post('/:id/delete', productController.delete);

module.exports = router;
