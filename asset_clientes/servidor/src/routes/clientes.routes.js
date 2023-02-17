const {Router} = require('express');
const pool= require('../db');
const {getAllCLientes, getIdCliente,crearCliente,eliminarCliente, actualizarCliente} = require('../controller/clientes.controller')
const router = Router();

router.get('/cliente', getAllCLientes) 
router.get('/cliente/:ced_cliente', getIdCliente) 
router.post('/cliente',crearCliente) 
router.delete('/cliente/:ced_cliente',eliminarCliente) 
router.put('/cliente/:ced_cliente',actualizarCliente) 

module.exports= router;