import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';


export default function ProductosForm() {

  const [productos, setProductos] = useState({
    pro_id: "",
    pro_codigo: "",
    pro_nombre: "",
    pro_precio: "",
    pro_descripcion: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (editing) {
    await fetch(`http://localhost:3000/productos/${params.pro_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productos),
      });
    } else {
      await fetch("http://localhost:3000/productos", {
        method: "POST",
        body: JSON.stringify(productos),
        
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(JSON.stringify(productos));
    setLoading(false)
    navigate('/')
  }

  const handleChange = e =>
    setProductos({ ...productos, [e.target.name]: e.target.value })

  const loadProductos = async (pro_id) => {
    const res = await fetch(`http://localhost:3000/productos/${pro_id}`)
    const data = await res.json()
    setProductos({ pro_id, pro_codigo: data.pro_codigo, pro_nombre: data.pro_nombre, pro_precio: data.pro_precio, pro_descripcion: data.pro_descripcion })
    setEditing(true)
  };

  useEffect(() => {
    if (params.pro_id) {

      loadProductos(params.pro_id)
    }
  }, [params.pro_id])

  return (

    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant='5' textAlign='center' color='white'>
            {editing? "Editar Productos" : "Crear Productos"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Ingrese el código'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="pro_codigo"
                value={productos.pro_codigo}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant='filled'
                label='Ingrese el nombre'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="pro_nombre"
                value={productos.pro_nombre}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant='filled'
                label='Ingrese el precio'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="pro_precio"
                value={productos.pro_precio}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant='filled'
                label='Ingrese la descripción'
                multiline
                rows={3}
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="pro_descripcion"
                value={productos.pro_descripcion}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />              
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!productos.pro_codigo || !productos.pro_nombre || !productos.pro_precio ||
                  !productos.pro_descripcion}>
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}