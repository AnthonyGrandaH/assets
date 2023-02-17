const pool = require("../db");

const getAllProductos = async (req, res, next) => {
    try {
        const result = await pool.query(
            'select * from productos'
            )
        res.status(200).json(result.rows)
    } catch (error) {
        next(error)
    }

}

const getOneProductos = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('select * from productos where pro_id = $1', [id])

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No existen datos' })
        }

        res.status(200).json(result.rows)
    } catch (error) {
        next(error)
    }
}

const createProductos = async (req, res, next) => {
    const { pro_codigo, pro_nombre, pro_precio, pro_descripcion } = req.body
    
    try {
        const result = await pool.query("INSERT INTO productos (pro_codigo, pro_nombre, pro_precio, pro_descripcion) VALUES ($1, $2, $3, $4)", [pro_codigo, pro_nombre, pro_precio, pro_descripcion])
        res.status(200).json(result.rows)
    } catch (error) {
        next(error)
    }

}

const updateProductos = async (req, res, next) => {
    try {
        const { id } = req.params
        const { pro_codigo, pro_nombre, pro_precio, pro_descripcion } = req.body
        const result = await pool.query("UPDATE productos SET pro_codigo = $2, pro_nombre = $3, pro_precio =$4, pro_descripcion = $5, WHERE pro_id  = $1 RETURNING *", [id, pro_codigo, pro_nombre, pro_precio, pro_descripcion])

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'No existen datos' })
        }
        res.status(200).json({ message: 'Actualizado' })
        //res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const deleteProductos = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('delete from productos where pro_id = $1 RETURNING *', [id])

        if (result.rows.length === 0) {
            res.status(400).json({ message: 'No existen datos' })
        }

        res.status(200)
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllProductos,
    getOneProductos,
    createProductos,
    updateProductos,
    deleteProductos
}