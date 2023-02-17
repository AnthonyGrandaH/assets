import * as React from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography, NativeSelect, InputLabel } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';


export default function InventarioForm() {

  const [inventario, setInventario] = useState({
    descripcion: "",
    cantidad: "",
    fk_iddepartamento: "",
    observaciones: ""
  })

  const [departamento, setDepartamento] = useState([])

  const loadDepartamento = async () => {
    const response = await fetch('http://localhost:5000/departamentos')
    const data2 = await response.json()
    setDepartamento(data2)
  }

  const [editing, setEditing] = useState(false)

  const handleChange = (e) => {
    setInventario({ ...inventario, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await fetch(`http://localhost:5000/inventario/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(inventario),
        headers: { "Content-Type": "application/json" }
      })

    } else {
      await fetch('http://localhost:5000/inventario', {
        method: 'POST',
        body: JSON.stringify(inventario),
        headers: { "Content-Type": "application/json" }
      })
    }
    navigate('/inventario')
  }

  const navigate = useNavigate()
  const params = useParams()

  const loadOneInventario = async (idinventario) => {
    const res = await fetch(`http://localhost:5000/inventario/${params.id}`)
    const data = await res.json()
    console.log(data)
    setInventario({ descripcion: data.descripcion, cantidad: data.cantidad, observaciones: data.observaciones })
    setEditing(true)
  }

  useEffect(() => {
    loadDepartamento()
    if (params.id) {
      loadOneInventario(params.id)
    }
  }, [params.id])

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={4}>
        <Card
          sx={{ mt: 10 }}
          style={{
            backgroundColor: "#1E272E",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar Inventario" : "Crear Inventario"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                placeholder="Descripción"
                label="Derscripción"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="descripcion"
                onChange={handleChange}
                value={inventario.descripcion}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                label="Cantidad"
                placeholder="Cantidad"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="cantidad"
                onChange={handleChange}
                value={inventario.cantidad}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField id="outlined-select-currency"
                select
                label="Departamento"
                defaultValue=""
                helperText="Seleccione un departamento"
                
                name="departamento"
                onChange={handleChange}
                value={inventario.fk_iddepartamento}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}>
                  

                  {departamento.map((departamento) => {
                    <MenuItem key={departamento.iddepartamento} value={departamento.iddepartamento}>{departamento.nombre_departamento}</MenuItem>
                  })}

              </TextField>
              

              <TextField
                variant="filled"
                placeholder="Observaciones"
                label="Observaciones"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="observaciones"
                onChange={handleChange}
                value={inventario.observaciones}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

            </form>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!inventario.descripcion || !inventario.cantidad ||!inventario.fk_iddepartamento || !inventario.observaciones}
              >
                Guardar
              </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};


