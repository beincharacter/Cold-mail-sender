import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'left' }}
          >
            Email Sender
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' } }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/template"
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' } }}
            >
              Template
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/dataset"
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' } }}
            >
              Dataset
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/send"
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' } }}
            >
              Send Emails
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
