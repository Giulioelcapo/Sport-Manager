import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Importa i tuoi componenti qui
import Dashboard from './components/Dashboard';
import GiocatoriPage from './components/GiocatoriPage';
import TestFisiciPage from './components/TestFisiciPage';
import Workout from './components/Workout';
import Wellness from './components/Wellness';
import RPE from './components/RPE';

export const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 240,
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
            Menu
          </Typography>

          {/* Bottoni con icone per la navigazione */}
          <Link to="/GiocatoriPage" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PersonAddIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Inserisci Giocatori
            </Button>
          </Link>

          <Link to="/TestFisiciPage" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AssignmentIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Inserisci Test Fisici
            </Button>
          </Link>

          <Link to="/Workout" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FitnessCenterIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Workout
            </Button>
          </Link>

          <Link to="/Wellness" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SpaIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Wellness
            </Button>
          </Link>

          <Link to="/RPE" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AssessmentIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              RPE
            </Button>
          </Link>
        </Box>

        {/* Contenuto principale con le Routes */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 4,
            overflowY: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/GiocatoriPage" element={<GiocatoriPage />} />
            <Route path="/TestFisiciPage" element={<TestFisiciPage />} />
            <Route path="/Workout" element={<Workout />} />
            <Route path="/Wellness" element={<Wellness />} />
            <Route path="/RPE" element={<RPE />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
