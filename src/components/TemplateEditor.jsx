import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function TemplateEditor() {
  const [template, setTemplate] = useState('');

  useEffect(() => {
    // Load template from localStorage
    const savedTemplate = localStorage.getItem('emailTemplate');
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, []);

  const handleSave = () => {
    // Save template to localStorage
    localStorage.setItem('emailTemplate', template);
    alert('Template saved successfully!');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Email Template Editor
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={10}
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        placeholder="Enter your email template here. Use {{ variable_name }} for placeholders."
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSave}>
        Save Template
      </Button>
    </Box>
  );
}

export default TemplateEditor;