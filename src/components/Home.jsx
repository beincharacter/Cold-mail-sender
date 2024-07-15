import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Email Sender
      </Typography>
      <Typography variant="body1" paragraph>
        Create templates, manage datasets, and send personalized emails.
      </Typography>
      <Box>
        <Button variant="contained" component={RouterLink} to="/template" sx={{ m: 1 }}>
          Create Template
        </Button>
        <Button variant="contained" component={RouterLink} to="/dataset" sx={{ m: 1 }}>
          Manage Dataset
        </Button>
        <Button variant="contained" component={RouterLink} to="/send" sx={{ m: 1 }}>
          Send Emails
        </Button>
      </Box>
    </Box>
  );
}

export default Home;