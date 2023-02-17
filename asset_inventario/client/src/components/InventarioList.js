import { grid } from "@mui/system"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";



export default function InventarioList() {

  const navigate = useNavigate();

  const [inventario, setInventario] = useState([])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



  const loadInventario = async () => {
    const response = await fetch('http://localhost:5000/inventario')
    const data = await response.json()
    setInventario(data)
  }


  const handleDelete = async (idinventario) => {

    await fetch(`http://localhost:5000/inventario/${idinventario}`, {
      method: "DELETE",
    });

    setInventario(
      inventario.filter((inventario) => inventario.idinventario !== idinventario));
    window.location.reload(true)
  }

  useEffect(() => {
    loadInventario()
  }, [])

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ display: 'block', margin: '.5rem 0' }}
        onClick={() => navigate("/inventario/new")}
      >
        Crear Inventario
      </Button>
      <h1>Lista de Inventario</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Descripción</StyledTableCell>
              <StyledTableCell align="right">Cantidad</StyledTableCell>
              <StyledTableCell align="right">Departamento</StyledTableCell>
              <StyledTableCell align="right">Observaciones</StyledTableCell>
              <StyledTableCell align="right">Fecha Registro</StyledTableCell>
              <StyledTableCell align="right">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventario.map((inventario) => (
              <StyledTableRow key={inventario.idinventario}>
                <StyledTableCell component="th" scope="row">
                  {inventario.idinventario}
                </StyledTableCell>
                <StyledTableCell align="right">{inventario.descripcion}</StyledTableCell>
                <StyledTableCell align="right">{inventario.cantidad}</StyledTableCell>
                <StyledTableCell align="right">{inventario.nombre_departamento}</StyledTableCell>
                <StyledTableCell align="right">{inventario.fecha_registro}</StyledTableCell>
                <StyledTableCell align="right">{inventario.observaciones}</StyledTableCell>
                <StyledTableCell align="right">

                  <Button variant="contained" color="inherit" onClick={() => navigate(`/inventario/${inventario.idinventario}/edit`)}>Actualizar</Button>


                  <Button variant="contained" color="warning"
                    onClick={() => handleDelete(inventario.idinventario)}
                    style={{ marginLeft: ".5rem" }}
                  >Eliminar
                  </Button>

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}
