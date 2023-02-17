import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DepartamentoForm() {

  const [departamento, setDepartamento] = useState({
    nombre_departamento: ''
  })

  const [editing, setEditing] = useState(false)
  const handleChange = (e) => {
    setDepartamento({ ...departamento, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await fetch(`http://localhost:5000/departamentos/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(departamento),
        headers: { "Content-Type": "application/json" }
      })

    }else{
    await fetch('http://localhost:5000/departamentos', {
      method: 'POST',
      body: JSON.stringify(departamento),
      headers: { "Content-Type": "application/json" }
    })
  }


    navigate('/departamento')
  }

  const navigate = useNavigate()
  const params = useParams()

  const loadOneDepartamento = async (iddepartamento) => {
    const res = await fetch(`http://localhost:5000/departamentos/${params.id}`)
    const data = await res.json()
    console.log(data)
    setDepartamento({ nombre_departamento: data.nombre_departamento })
    setEditing(true)
  }

  useEffect(() => {
    if (params.id) {
      loadOneDepartamento(params.id)
    }
  }, [params.id])
  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={2}>
        <Card sx={{ mt: 10 }} style={{
          background: "#1e272e",
          padding: "1rem"
        }}>
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar Departamento" : "Crear Departamento"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                placeholder="Nombre Departamento"
                label="Nombre del Departamento"
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="nombre_departamento"
                value={departamento.nombre_departamento || ""}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}></TextField>
              <Button variant="contained" color="primary" type="submit" disabled={!departamento.nombre_departamento}>
                Crear Departamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
