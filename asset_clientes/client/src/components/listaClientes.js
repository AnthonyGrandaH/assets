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



export default function ListaClientes() {
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

  const [clientes, setClientes] = useState([])

  const loadClientes = async () => {
    const response = await fetch('http://localhost:4000/cliente')
    const data = await response.json()
    setClientes(data)
    setTablaCliente(data)
  }

  const handleDelete = async (ced_cliente) => {
    await fetch(`http://localhost:4000/cliente/${ced_cliente}`, {
      method: "DELETE",
    })
    setClientes(clientes.filter((cliente) => cliente.ced_cliente !== ced_cliente));
  }

  useEffect(() => {
    loadClientes();
  }, []);

  /*Busqueda por ID*/
  const [busqueda, setBusqueda] = useState("")
  const [tablacliente, setTablaCliente] = useState([])

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);  
  }
  const filtrar =(terminoBusqueda) =>{
    var resultadoBusqueda= tablacliente.filter((clientes)=>{
      if(clientes.nombre_cliente.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return clientes;
      }
    })
    setClientes(resultadoBusqueda);
  }

  return (
    <>
      <h1>Lista Clientes </h1>
      
      <div>
      <SearchIcon></SearchIcon>
      <input value={busqueda} onChange={handleChange} 
      placeholder='Search name client' 
      className='form-control inputBuscar'>
      </input>
      </div><br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Cédula Identidad</StyledTableCell>
              <StyledTableCell align="right">Nombres</StyledTableCell>
              <StyledTableCell align="right">Teléfono</StyledTableCell>
              <StyledTableCell align="right">Dirección</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <StyledTableRow key={cliente.ced_cliente}>

                <StyledTableCell align="right">{cliente.ced_cliente}</StyledTableCell>
                <StyledTableCell align="right">{cliente.nombre_cliente}</StyledTableCell>
                <StyledTableCell align="right">{cliente.telefono_cliente}</StyledTableCell>
                <StyledTableCell align="right">{cliente.direccion_cliente}</StyledTableCell>
                <StyledTableCell align="right">{cliente.email_cliente}</StyledTableCell>
                <StyledTableCell align="right">

                  <Button variant='contained' color='inherit' onClick={() => navigate(`/cliente/${cliente.ced_cliente}/edit`)}>
                    Actualizar
                  </Button>

                  <Button variant='contained' color='warning' onClick={() => handleDelete(cliente.ced_cliente)} style={{ marginLeft: ".5rem" }}>
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
