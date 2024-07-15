import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import TemplateEditor from './components/TemplateEditor';
import DatasetEditor from './components/DatasetEditor';
import EmailSender from './components/EmailSender';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/template" element={<TemplateEditor />} />
            <Route path="/dataset" element={<DatasetEditor />} />
            <Route path="/send" element={<EmailSender />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;