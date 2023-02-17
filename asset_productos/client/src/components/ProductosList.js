import { useEffect, useState } from 'react';
import { Button, Icon, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";



export default function ProductosList() {
  const navigate = useNavigate();

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

  const [productos, setProductos] = useState([])

  const loadProductos = async () => {
    const response = await fetch('http://localhost:3000/productos')
    const data = await response.json()
    setProductos(data)
    setTablaProductos(data)
  }

  const handleDelete = async (pro_id) => {
    await fetch(`http://localhost:3000/productos/${pro_id}`, {
      method: "DELETE",
    })
    setProductos(productos.filter((productos) => productos.pro_id !== pro_id));
  }

  useEffect(() => {
    loadProductos();
  }, []);

  /*Busqueda por ID*/
  const [busqueda, setBusqueda] = useState("")
  const [tablaproductos, setTablaProductos] = useState([])

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);  
  }
  const filtrar =(terminoBusqueda) =>{
    var resultadoBusqueda= tablaproductos.filter((productos)=>{
      if(productos.pro_id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return productos;
      }
    })
    setProductos(resultadoBusqueda);
  }

  return (
    <>
      <h1>Lista Productos </h1>
      
      <div>
      <SearchIcon></SearchIcon>
      <input value={busqueda} onChange={handleChange} 
      placeholder='Search name product' 
      className='form-control inputBuscar'>
      </input>
      </div><br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Código</StyledTableCell>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Descripción</StyledTableCell>
              <StyledTableCell align="center">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((productos) => (
              <StyledTableRow key={productos.pro_id}>

                <StyledTableCell align="right">{productos.pro_id}</StyledTableCell>
                <StyledTableCell align="right">{productos.pro_codigo}</StyledTableCell>
                <StyledTableCell align="right">{productos.pro_nombre}</StyledTableCell>
                <StyledTableCell align="right">{productos.pro_precio}</StyledTableCell>
                <StyledTableCell align="right">{productos.pro_descripcion}</StyledTableCell>
                <StyledTableCell align="right">

                  <Button variant='contained' color='inherit' onClick={() => navigate(`/productos/${productos.pro_id}/edit`)}>
                    Actualizar
                  </Button>

                  <Button variant='contained' color='warning' onClick={() => handleDelete(productos.pro_id)} style={{ marginLeft: ".5rem" }}>
                    Eliminar
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