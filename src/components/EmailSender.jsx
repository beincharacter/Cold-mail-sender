import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';

function EmailSender() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [dataset, setDataset] = useState([]);
  const [sending, setSending] = useState(false);
  const [emailStatuses, setEmailStatuses] = useState([]);

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    const savedDataset = JSON.parse(localStorage.getItem('emailDataset') || '[]');
    setTemplates(savedTemplates);
    setDataset(savedDataset);
  }, []);

  const handleSendEmails = async () => {
    if (!selectedTemplate) {
      setEmailStatuses([{ error: 'Please select a template before sending emails.' }]);
      return;
    }
    setSending(true);
    setEmailStatuses(dataset.map(() => ({ status: 'pending' })));

    const templateContent = templates.find(t => t.name === selectedTemplate).content;

    for (let i = 0; i < dataset.length; i++) {
      try {
        const response = await axios.post('http://localhost:3001/api/send-emails', { 
          template: templateContent, 
          dataset: [dataset[i]]  // Send one email at a time
        });
        setEmailStatuses(prev => {
          const newStatuses = [...prev];
          newStatuses[i] = { status: 'success', message: response.data.message };
          return newStatuses;
        });
      } catch (error) {
        setEmailStatuses(prev => {
          const newStatuses = [...prev];
          newStatuses[i] = { status: 'error', message: error.message };
          return newStatuses;
        });
      }
    }

    setSending(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Send Emails
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="template-select-label">Select Template</InputLabel>
        <Select
          labelId="template-select-label"
          id="template-select"
          value={selectedTemplate}
          label="Select Template"
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map((template, index) => (
            <MenuItem key={index} value={template.name}>{template.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body1" paragraph>
        Dataset: {dataset.length} recipients
      </Typography>
      <Button
        variant="contained"
        onClick={handleSendEmails}
        disabled={sending || !selectedTemplate || dataset.length === 0}
      >
        {sending ? <CircularProgress size={24} /> : 'Send Emails'}
      </Button>
      {emailStatuses.length > 0 && (
        <List>
          {dataset.map((recipient, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {emailStatuses[index]?.status === 'success' ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : emailStatuses[index]?.status === 'error' ? (
                  <ErrorOutlineIcon color="error" />
                ) : (
                  <CircularProgress size={24} />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={recipient.recipient_email}
                secondary={emailStatuses[index]?.message || 'Pending...'}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default EmailSender;