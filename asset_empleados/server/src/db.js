const { Pool } = require('pg')
const { db } = require('./config')

const pool = new Pool({
    user: db.user,
    host: db.host,
    port: db.port,
    database: db.database,
    password: db.password,
})

module.exports = pool;