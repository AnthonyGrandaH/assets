const pool = require('../db')

const getAllCLientes = async (req, res, next) => {
    try {
        const result = await pool.query('select * from cliente')
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
};

const getIdCliente = async (req, res,next) => {
    try {
        const { ced_cliente } = req.params

        const result = await pool.query('select * from cliente where ced_cliente = $1', [ced_cliente]);

        if (result.rows.length === 0) {
            res.status(400).json({ message: 'No existen datos con la identidad ingresada' });
        }

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
};

const crearCliente = async (req, res, next) => {

    const { ced_cliente, nombre_cliente, telefono_cliente, direccion_cliente, email_cliente } = req.body;

    try {
        const result = await pool.query("INSERT INTO cliente(ced_cliente, nombre_cliente, telefono_cliente,direccion_cliente, email_cliente) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [ced_cliente, nombre_cliente, telefono_cliente, direccion_cliente, email_cliente]);
        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
};

const eliminarCliente = async(req, res, next) => {
    try {
        const { ced_cliente } = req.params

        const result = await pool.query('DELETE from cliente where ced_cliente = $1 RETURNING *', [ced_cliente])

        if (result.rows.length === 0) {
            res.status(400).json({ message: 'No existen datos con la identidad ingresada' })
        }

        res.status(204)
    } catch (error) {
        next(error)
    }

};

const actualizarCliente = async(req, res, next) => {
    try {
        const { ced_cliente} = req.params
        const { nombre_cliente, telefono_cliente, direccion_cliente, email_cliente} = req.body
        const result = await pool.query("UPDATE cliente SET nombre_cliente = $2, telefono_cliente = $3, direccion_cliente= $4, email_cliente = $5 WHERE ced_cliente = $1 RETURNING *", [ced_cliente, nombre_cliente, telefono_cliente,direccion_cliente,email_cliente])

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No existen datos con la identidad ingresada' })
        }
        res.status(200).json({ message: 'Actualizado' })
        //res.json(result.rows)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllCLientes,
    getIdCliente, 
    crearCliente,
    eliminarCliente,
    actualizarCliente

}