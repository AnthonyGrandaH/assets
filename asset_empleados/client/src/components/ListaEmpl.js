import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


const ListaEmpl = () => {

    const [empleados, setEmpleados] = useState([]);  
    const navigate = useNavigate()

    const cargarEmpleados = async () => {
        const response = await fetch("http://localhost:4000/empleados");
        const data = await response.json();
        setEmpleados(data);
    };

    const eliminarEmpleado = async (id) => {
        try {
            await fetch(`http://localhost:4000/empleados/${id}`, {
                method: "DELETE",
            });
            setEmpleados(empleados.filter((empleado) => empleado.id !== id));

        } catch (error) {
            console.error(error);
        }
    };


    const estadoEmpleado = async (id) => {

        try {
            await fetch(`http://localhost:4000/empleados/estado/${id}`, {
                method: "PUT",
            });

        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        cargarEmpleados();  
    }, []);


    return (
        <>
            <h1>LISTA DE EMPLEADOS</h1>
            <TableContainer component={Paper} sx={{ maxHeight: '550PX' }} style={{ backgroundColor: '#37474f' }} >
                <Table sx={{ minWidth: 650 }} aria-label='simple table' stickyHeader >
                    <TableHead >
                        <TableRow >

                            <TableCell align='center' sx={{ fontWeight: 'bold' }} >CEDULA</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>NOMBRES</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>APELLIDOS</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>DIRECCION</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>CORREO</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>CARGO</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>ESTADO</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>OPCIONES</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            empleados.map((empleado) => (
                                <TableRow key={empleado.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>


                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.cedula}</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.nombres}</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.apellidos}</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.direccion}</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.correo}</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.cargo}</TableCell>                 
                                    <TableCell align='center' style={{ color: 'white' }}>{empleado.activo ? 'Activo' : 'Inactivo'}</TableCell>
                                    <TableCell align='center'>

                                        <Button variant='contained' color='warning' onClick={() => estadoEmpleado(empleado.id) && window.location.reload()} style={{ marginLeft: ".5rem" }}>
                                            {empleado.activo ? <CheckBoxIcon style={{ color: 'white' }} /> : <CheckBoxOutlineBlankIcon style={{ color: 'white' }} />}

                                        </Button>
                                        &nbsp; &nbsp;

                                        {empleado.activo ?
                                            <Button variant='contained' color='primary' onClick={() => navigate(`/empleados/${empleado.id}/edit`)} >
                                                <EditIcon style={{ color: 'white' }} />
                                            </Button>
                                            :
                                            <Button variant='contained' disabled='true' color='primary' onClick={() => navigate(`/empleados/${empleado.id}/edit`)} >
                                                <EditIcon style={{ color: 'white' }} />
                                            </Button>
                                        }

                                        <Button variant='contained' color='error' onClick={() => eliminarEmpleado(empleado.id) && window.location.reload()} style={{ marginLeft: ".5rem" }}>
                                            <DeleteIcon style={{ color: 'white' }} />
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};
export default ListaEmpl;
