const {config} = require('dotenv')
config()
/**
 * Asignación de los parámentros para la conexión a la base de datos PostgreSQL con variables de entorno
 */
module.exports = {
    db:{
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}