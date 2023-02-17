const pool = require('../db')

//EMPLADOS
//Encontrar empleados
const getEmpleados = async (req, res, next) => {
    try {
        const empleados = await pool.query("SELECT * FROM empleados");
        console.log(empleados);
        res.json(empleados.rows);
    } catch (error) {
        next(error)
    }
}

const getEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM empleados WHERE id =$1', [id])
        if (result.rows.length === 0) return res.status(404).json({ message: 'Emplado no encontrado' })
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

//Crear empleados
const crearEmpleado = async (req, res, next) => {
    const { cedula, nombres, apellidos, direccion, correo, cargo } = req.body;

    try {
        const result = await pool.query("INSERT INTO empleados (cedula, nombres, apellidos, direccion, correo, cargo) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ",
            [cedula, nombres, apellidos, direccion, correo, cargo]);

        res.json(result.rows[0]);

    } catch (error) {
        next(error)

    }
};

//Eliminar empleados
const eliminarEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM empleados WHERE id=$1', [id])
        if (result.rowCount === 0) return res.status(404).json({ message: "Empleado no encontrado" });
        return res.status(204);
    } catch (error) {
        next(error)
    }
};

//Actualizar empleados
const actualizarEmpleado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { cedula, nombres, apellidos, direccion, correo, cargo } = req.body;
        const result = await pool.query('UPDATE empleados SET cedula=$1, nombres=$2, apellidos=$3, direccion=$4, correo=$5, cargo=$6 WHERE id=$7 RETURNING *',
            [cedula, nombres, apellidos, direccion, correo, cargo, id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Empleado no encontrado" });

        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
};

const actualizarEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('UPDATE empleados SET activo=NOT activo WHERE id=$1 ', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
};

//CARGOS
const getAllCargo = async (req, res, next) => {
    try {

        const allCargo = await pool.query('SELECT *FROM cargo')
        res.json(allCargo.rows)

    } catch (error) {
        return next(error);
    }


}

const getCargo = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await pool.query("SELECT * FROM cargo WHERE id= $1", [id])
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cargo no encontrado"
            });

        res.json(result.rows[0]);
    } catch (error) {
        return next(error);
    }


}

const createCargo = async (req, res, next) => {
    const { tipocargo, descripcioncargo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cargo (tipoCargo, descripcionCargo) VALUES ($1,$2) RETURNING *',
            [tipocargo, descripcioncargo]);

        res.json(result.rows[0]);

    } catch (error) {
        return next(error);
    }
}

const deleteCargo = async (req, res, next) => {

    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM cargo WHERE id = $1", [id]);

        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Cargo no encontrado"
            });
        return res.sendStatus(204)
    } catch (error) {
        return next(error);
    }

}


const updateCargo = async (req, res, next) => {
    const { id } = req.params;
    const { tipocargo, descripcioncargo } = req.body;
    try {
        const result = await pool.query("UPDATE cargo SET tipocargo=$1, descripcioncargo=$2 WHERE id= $3 RETURNING*", [tipocargo, descripcioncargo, id]);
        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cargo no encontrado"
            })

        return res.json(result.rows[0])

    } catch (error) {
        return next(error);
    }

}

module.exports = {
    getEmpleados,
    getEmpleado,
    crearEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    actualizarEstado,
    getAllCargo,
    getCargo,
    createCargo,
    deleteCargo,
    updateCargo
}