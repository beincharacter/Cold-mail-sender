import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

function EmailSender() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [dataset, setDataset] = useState([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    const savedDataset = JSON.parse(localStorage.getItem('emailDataset') || '[]');
    setTemplates(savedTemplates);
    setDataset(savedDataset);
  }, []);

  const handleSendEmails = async () => {
    if (!selectedTemplate) {
      setResult('Please select a template before sending emails.');
      return;
    }

    setSending(true);
    setResult('');
    try {
      const templateContent = templates.find(t => t.name === selectedTemplate).content;
      const response = await axios.post('http://localhost:3001/api/send-emails', { template: templateContent, dataset });
      setResult(`Emails sent successfully! ${response.data.message}`);
    } catch (error) {
      setResult(`Error sending emails: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Send Emails
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Template</InputLabel>
        <Select
          value={selectedTemplate}
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
      {result && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {result}
        </Typography>
      )}
    </Box>
  );
}

export default EmailSender;