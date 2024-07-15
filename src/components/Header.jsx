import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Email Sender
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/template">Template</Button>
          <Button color="inherit" component={RouterLink} to="/dataset">Dataset</Button>
          <Button color="inherit" component={RouterLink} to="/send">Send Emails</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;