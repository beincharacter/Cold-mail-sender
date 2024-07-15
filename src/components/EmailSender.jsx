import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

function EmailSender() {
  const [template, setTemplate] = useState('');
  const [dataset, setDataset] = useState([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Load template and dataset from localStorage
    const savedTemplate = localStorage.getItem('emailTemplate') || '';
    const savedDataset = JSON.parse(localStorage.getItem('emailDataset') || '[]');
    setTemplate(savedTemplate);
    setDataset(savedDataset);
  }, []);

  const handleSendEmails = async () => {
    setSending(true);
    setResult('');
    try {
      const response = await axios.post('http://localhost:3001/api/send-emails', { template, dataset });
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
      <Typography variant="body1" paragraph>
        Template: {template ? 'Loaded' : 'Not found'}
      </Typography>
      <Typography variant="body1" paragraph>
        Dataset: {dataset.length} recipients
      </Typography>
      <Button
        variant="contained"
        onClick={handleSendEmails}
        disabled={sending || !template || dataset.length === 0}
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