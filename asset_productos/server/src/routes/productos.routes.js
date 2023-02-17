const router = require("express").Router();
const pool = require("../db");
const { createProductos, deleteProductos, getAllProductos, getOneProductos, updateProductos } = require('../controllers/productos.controller')

router.get('/productos', getAllProductos)

router.get('/productos/:id', getOneProductos)

router.post('/productos', createProductos)

router.put('/productos/:id', updateProductos)

router.delete('/productos/:id', deleteProductos)


module.exports = router;