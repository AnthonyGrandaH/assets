import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DepartamentoList from './components/DepartamentoList'
import DepartamentoForm from './components/DepartamentoForm'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Container>
        <Routes>
        <Route path='/' element={<DepartamentoList />} />
          <Route path='/departamento' element={<DepartamentoList />} />
          <Route path='/departamento/new' element={<DepartamentoForm />} />
          <Route path='/departamento/:id/edit' element={<DepartamentoForm />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}