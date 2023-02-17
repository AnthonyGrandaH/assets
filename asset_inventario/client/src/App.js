import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DepartamentoList from './components/DepartamentoList'
import DepartamentoForm from './components/DepartamentoForm'
import InventarioList from './components/InventarioList'
import InventarioForm from './components/InventarioForm'
import Index from './components/index'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Container>
        <Routes>
        <Route path='/' element={<Index />} />
          <Route path='/departamento' element={<DepartamentoList />} />
          <Route path='/departamento/new' element={<DepartamentoForm />} />
          <Route path='/departamento/:id/edit' element={<DepartamentoForm />}/>
          <Route path='/inventario' element={<InventarioList />} />
          <Route path='/inventario/new' element={<InventarioForm />} />
          <Route path='/inventario/:id/edit' element={<InventarioForm />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}