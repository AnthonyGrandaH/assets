const { password } = require("pg/lib/defaults")
const {db} = require('./config')
const Pool = require("pg").Pool
/**
 * Conexión a la base de datos de PostgreSQL con las variables asignadas en el archivo config.js
 */
const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
});


module.exports = pool;