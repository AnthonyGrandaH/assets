import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaProductos from './components/ProductosList';
import FormProductos from './components/ProductosForm';
import Menu from './components/Navbar';
import { Container } from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
     <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<ListaProductos />} />
          <Route path="/productos/nuevo" element={<FormProductos />} />
          <Route path="/productos/:pro_id/edit" element={<FormProductos/>}/>
        </Routes>
        </Container>
    </BrowserRouter>
  );
}