import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";

export default function DepartamentoList() {
  const navigate = useNavigate();

  const [departamento, setDepartamento] = useState([])

  const loadDepartamento = async () => {
    const response = await fetch('http://localhost:5000/departamentos')
    const data = await response.json()
    setDepartamento(data)
  }

  const handleDelete = async (iddepartamento) => {

    await fetch(`http://localhost:5000/departamentos/${iddepartamento}`, {
      method: "DELETE",
    });

    setDepartamento(
      departamento.filter((departamento) => departamento.iddepartamento !== iddepartamento));
    window.location.reload(true)
  }


  useEffect(() => {
    loadDepartamento()
  }, [])

  return (

    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ display: 'block', margin: '.5rem 0' }}
        onClick={() => navigate("/departamento/new")}
      >
        Crear Departamento
      </Button>
      <h1>Lista de Departamentos</h1>
      {
        departamento.map((departamento) => (
          <Card style={{
            marginBottom: ".7rem",
            backgroundColor: '#1e272e'
          }}
            key={departamento.iddepartamento}>
            <CardContent style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div style={{ color: "white" }}>
                <Typography >{departamento.nombre_departamento}</Typography>
              </div>
              <div>
                <Button variant="contained" color="inherit" onClick={() => navigate(`/departamento/${departamento.iddepartamento}/edit`)}>Actualizar</Button>
                
                
                <Button variant="contained" color="warning"
                  onClick={() => handleDelete(departamento.iddepartamento)}
                  style={{ marginLeft: ".5rem" }}
                >Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}
