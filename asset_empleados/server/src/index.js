const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const rutas = require('./routes/routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(rutas)

app.use((err, req, res, next) => {
    return res.json({ message: err.message})
})

app.listen(4000)
console.log('Servidor corriendo en el puerto: 4000')