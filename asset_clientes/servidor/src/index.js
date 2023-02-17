const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes.routes');

const app= express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(clientesRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: 'Error'
    })
})


app.listen(4000)
console.log('Server on port 4000')

