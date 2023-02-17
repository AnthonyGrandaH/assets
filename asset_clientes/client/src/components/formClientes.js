import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';


export default function FormClientes() {

  const [cliente, setCliente] = useState({
    ced_cliente: "",
    nombre_cliente: "",
    direccion_cliente: "",
    telefono_cliente: "",
    email_cliente: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (editing) {
    await fetch(`http://localhost:4000/cliente/${params.ced_cliente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });
    } else {
      await fetch("http://localhost:4000/cliente", {
        method: "POST",
        body: JSON.stringify(cliente),
        headers: { "Content-Type": "application/json" },
      });
    }


    setLoading(false)
    navigate('/')
  }

  const handleChange = e =>
    setCliente({ ...cliente, [e.target.name]: e.target.value })

  const loadClientes = async (ced_cliente) => {
    const res = await fetch(`http://localhost:4000/cliente/${ced_cliente}`)
    const data = await res.json()
    setCliente({ ced_cliente, nombre_cliente: data.nombre_cliente, telefono_cliente: data.telefono_cliente, direccion_cliente: data.direccion_cliente, email_cliente: data.email_cliente })
    setEditing(true)
  };

  useEffect(() => {
    if (params.ced_cliente) {

      loadClientes(params.ced_cliente)
    }
  }, [params.ced_cliente])

  return (

    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant='5' textAlign='center' color='white'>
            {editing? "Editar Cliente" : "Crear Cliente"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Ingrese su identificación'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="ced_cliente"
                value={cliente.ced_cliente}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant='filled'
                label='Ingrese su nombre'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="nombre_cliente"
                value={cliente.nombre_cliente}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant='filled'
                label='Ingrese su teléfono'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="telefono_cliente"
                value={cliente.telefono_cliente}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant='filled'
                label='Ingrese su dirección'
                multiline
                rows={3}
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="direccion_cliente"
                value={cliente.direccion_cliente}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}

              />
              <TextField
                variant='filled'
                label='Ingrese su email'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="email_cliente"
                value={cliente.email_cliente}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!cliente.ced_cliente || !cliente.nombre_cliente || !cliente.telefono_cliente ||
                  !cliente.direccion_cliente || !cliente.email_cliente}>
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

    </Grid>

  );
}
