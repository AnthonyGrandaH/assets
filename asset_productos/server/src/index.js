const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan')
const routes = require('./routes/productos.routes')

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

//Rutas

app.use(routes)
app.use((err, req, res, next) => {
    return res.json({
        message: 'Error'
    })
})
app.listen(3000, () =>{
    console.log("server is running in port 3000")
});