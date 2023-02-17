import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import ListaEmpl from './components/ListaEmpl'
import CargoForm from './components/cargo/Cargoform'
import CargoList from './components/cargo/Cargolist'
import Menu from './components/Navbar'
import { Container } from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path='/' element={<ListaEmpl />} />
          <Route path='/empleado/new' element={<Form />} />
          <Route path="/empleados/:id/edit" element={<Form />} />
          
          <Route path='/cargo' element={<CargoList />} />
          <Route path='/cargo/new' element={<CargoForm />} />
          <Route path='/cargo/:id/edit' element={<CargoForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}