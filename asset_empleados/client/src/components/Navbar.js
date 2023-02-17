import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function Navbar() {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent' >
        <Container>
          <Toolbar>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#eee' }}>
                PERN
              </Link>
            </Typography>
            <Button variant='contained' color='success' onClick={() => navigate("/empleado/new")}>
              <AddCircleIcon />
              &nbsp; Nuevo empleado
            </Button>
            &nbsp;
            &nbsp;
            <Button variant='contained' color='warning' onClick={() => navigate("/cargo")}>
              <AddCircleIcon />
              &nbsp;Cargo
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}