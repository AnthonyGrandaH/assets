import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material"
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate()

  return (
    <Box>
      <AppBar position='static' color="transparent">
        <Container>
          <Toolbar>
            <Typography variant='h6' sx={{flexGrow:1}}>
              <Link to="/" style={{textDecoration: "none", color:"#eee"}}>Cliente</Link>
            </Typography >
            <Button variant='contained' color='primary' onClick={() => navigate('/cliente/nuevo')}>
              Nuevo Cliente
            </Button>
          </Toolbar>

        </Container>
      </AppBar>
    </Box>
  )
}
