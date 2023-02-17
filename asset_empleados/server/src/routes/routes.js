const { Router } = require('express');
const { getEmpleados, getEmpleado, crearEmpleado, eliminarEmpleado, actualizarEmpleado, actualizarEstado } = require('../controllers/controller.js');
const { getAllCargo, getCargo, createCargo, deleteCargo, updateCargo } = require('../controllers/controller')
const router = Router();

//RUTAS
//Empleados
//Obtener empleados
router.get('/empleados', getEmpleados);

router.get('/empleados/:id', getEmpleado);

//Crear nuevo empleado
router.post('/empleados', crearEmpleado);

//Eliminar empleado
router.delete('/empleados/:id', eliminarEmpleado);

//Actualizar empleado
router.put('/empleados/:id', actualizarEmpleado);
router.put('/empleados/estado/:id', actualizarEstado); //Para cambiar de activo a inactivo

//CARGO
router.get('/cargo', getAllCargo)

router.get('/cargo/:id', getCargo)

router.post('/cargo/', createCargo)

router.delete('/cargo/:id', deleteCargo)

router.put('/cargo/:id', updateCargo)

module.exports = router;