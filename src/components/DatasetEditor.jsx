import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DatasetEditor() {
  const [dataset, setDataset] = useState([]);
  const [newRecipient, setNewRecipient] = useState({
    recipient_email: '',
    company_name: '',
    recipient_name: '',
    job_link: '',
    job_type: ''
  });

  useEffect(() => {
    // Load dataset from localStorage
    const savedDataset = JSON.parse(localStorage.getItem('emailDataset') || '[]');
    setDataset(savedDataset);
  }, []);

  const handleInputChange = (e) => {
    setNewRecipient({ ...newRecipient, [e.target.name]: e.target.value });
  };

  const handleAddRecipient = () => {
    const updatedDataset = [...dataset, newRecipient];
    setDataset(updatedDataset);
    localStorage.setItem('emailDataset', JSON.stringify(updatedDataset));
    setNewRecipient({
      recipient_email: '',
      company_name: '',
      recipient_name: '',
      job_link: '',
      job_type: ''
    });
  };

  const handleDeleteRecipient = (index) => {
    const updatedDataset = dataset.filter((_, i) => i !== index);
    setDataset(updatedDataset);
    localStorage.setItem('emailDataset', JSON.stringify(updatedDataset));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dataset Editor
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          name="recipient_email"
          label="Recipient Email"
          value={newRecipient.recipient_email}
          onChange={handleInputChange}
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          name="company_name"
          label="Company Name"
          value={newRecipient.company_name}
          onChange={handleInputChange}
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          name="recipient_name"
          label="Recipient Name"
          value={newRecipient.recipient_name}
          onChange={handleInputChange}
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          name="job_link"
          label="Job Link"
          value={newRecipient.job_link}
          onChange={handleInputChange}
          sx={{ mr: 1, mb: 1 }}
        />
        <TextField
          name="job_type"
          label="Job Type"
          value={newRecipient.job_type}
          onChange={handleInputChange}
          sx={{ mr: 1, mb: 1 }}
        />
        <Button variant="contained" onClick={handleAddRecipient}>
          Add Recipient
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Job Link</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.map((recipient, index) => (
              <TableRow key={index}>
                <TableCell>{recipient.recipient_email}</TableCell>
                <TableCell>{recipient.company_name}</TableCell>
                <TableCell>{recipient.recipient_name}</TableCell>
                <TableCell>{recipient.job_link}</TableCell>
                <TableCell>{recipient.job_type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteRecipient(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DatasetEditor;