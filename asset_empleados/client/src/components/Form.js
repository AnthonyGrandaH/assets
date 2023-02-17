import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'


export default function Form() {
  const [cargo,setCargo] = useState([]);
  const [empleado, setEmpleado] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    correo: "",
    cargo: ""
  });

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)


  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (editing) {
      await fetch(`http://localhost:4000/empleados/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleado)
      });

      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Empleado actualizado correctamente',
        showConfirmButton: false,
        timer: 1200
      })

    } else {
      await fetch('http://localhost:4000/empleados', {
        method: 'POST',
        body: JSON.stringify(empleado),
        headers: { 'Content-Type': 'application/json' }
      })

    }

    setLoading(false)
    navigate('/')
  };

  const handleChange = (e) => setEmpleado({ ...empleado, [e.target.name]: e.target.value });

  const cargarEmpelado = async (id) => {
    const res = await fetch(`http://localhost:4000/empleados/${id}`)
    const data = await res.json();
    setEmpleado({ cedula: data.cedula, nombres: data.nombres, apellidos: data.apellidos, direccion: data.direccion, correo: data.correo, cargo: data.cargo });
    setEditing(true)
  };

  const loadcargos = async () => {
    const response = await fetch('http://localhost:4000/cargo')
    const data = await response.json()
    setCargo(data)
};

  useEffect(() => {
    loadcargos()
  }, []);

  useEffect(() => {
    if (params.id) {
      cargarEmpelado(params.id)
    }
  }, [params.id])


  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item xs={5} alignContent='center'>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '2rem' }}>
          <Typography variant='h5' textAlign='center' color='white'>
            {editing ? "Modificar Empleado" : "Registrar nuevo empleado"}
          </Typography>
          <CardContent >
            <form onSubmit={handleSubmit}>
              <TextField fullWidth variant='filled' label='Nro de cedula' sx={{ display: 'block', margin: '.5rem 0' }}
                name="cedula" value={empleado.cedula} onChange={handleChange}
                inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />

              <TextField fullWidth variant='filled' label='Nombres' sx={{ display: 'block', margin: '.5rem 0' }}
                name="nombres" value={empleado.nombres} onChange={handleChange}
                inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />

              <TextField fullWidth variant='filled' label='Apellidos' sx={{ display: 'block', margin: '.5rem 0' }}
                name="apellidos" value={empleado.apellidos} onChange={handleChange}
                inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />

              <TextField fullWidth variant='filled' label='Direccion' sx={{ display: 'block', margin: '.5rem 0' }}
                name="direccion" value={empleado.direccion} onChange={handleChange}
                inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />

              <TextField fullWidth variant='filled' type={'email'} label='Correo' sx={{ display: 'block', margin: '.5rem 0' }}
                name="correo" value={empleado.correo} onChange={handleChange}
                inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>Cargo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ color: 'white' }}
                    name="cargo"
                    value={empleado.cargo}
                    label="Cargo"
                    onChange={handleChange}

                  >
                    {cargo.map((cargo) => (
                      <MenuItem key={cargo.id} value={cargo.tipocargo}>
                        {cargo.tipocargo}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Box>

              <br />
              <Button variant='contained' style={{ display: 'block', margin: '0 auto' }} textAlign='center' color='primary' type='submit' disabled={
                !empleado.cedula ||
                !empleado.nombres ||
                !empleado.apellidos ||
                !empleado.direccion ||
                !empleado.correo ||
                !empleado.cargo
              }>
                {loading ? (<CircularProgress color="inherit" size={24} />) : (editing ? "Modificar empleado" : "Registrar empleado")}
              </Button>

            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
