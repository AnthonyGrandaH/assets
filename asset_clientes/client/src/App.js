import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaClientes from './components/listaClientes';
import FormClientes from './components/formClientes';
import Menu from './components/Navbar';
import { Container } from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
    <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<ListaClientes />} />
          <Route path="/cliente/nuevo" element={<FormClientes />} />
          <Route path="/cliente/:ced_cliente/edit" element={<FormClientes/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

