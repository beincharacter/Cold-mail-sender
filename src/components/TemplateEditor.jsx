import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TemplateEditor() {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: '', content: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Load templates from localStorage
    const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    setTemplates(savedTemplates);
  }, []);

  const handleSave = () => {
    if (currentTemplate.name && currentTemplate.content) {
      let updatedTemplates;
      if (editingIndex !== null) {
        // Update existing template
        updatedTemplates = templates.map((template, index) =>
          index === editingIndex ? currentTemplate : template
        );
      } else {
        // Add new template
        updatedTemplates = [...templates, currentTemplate];
      }
      setTemplates(updatedTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
      setCurrentTemplate({ name: '', content: '' });
      setEditingIndex(null);
      alert('Template saved successfully!');
    } else {
      alert('Please provide both template name and content.');
    }
  };

  const handleEdit = (index) => {
    setCurrentTemplate(templates[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTemplates = templates.filter((_, i) => i !== index);
    setTemplates(updatedTemplates);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Email Template Editor
      </Typography>
      <TextField
        fullWidth
        label="Template Name"
        value={currentTemplate.name}
        onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        label="Template Content"
        value={currentTemplate.content}
        onChange={(e) => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
        placeholder="Enter your email template here. Use {{ variable_name }} for placeholders."
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSave}>
        {editingIndex !== null ? 'Update Template' : 'Save Template'}
      </Button>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Template Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.map((template, index) => (
              <TableRow key={index}>
                <TableCell>{template.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="error">
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

export default TemplateEditor;