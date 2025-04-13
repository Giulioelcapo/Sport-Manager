import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa'; // Icona per Wellness
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'; // Icona alternativa per RPE (forza)

const Dashboard = () => {
  return (
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

        {/* Nuovo tasto Wellness */}
        <Link to="/Wellness" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<SpaIcon />} // Icona per Wellness
            sx={{ justifyContent: 'flex-start' }}
          >
            Wellness
          </Button>
        </Link>

        {/* Nuovo tasto RPE */}
        <Link to="/RPE" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AccessAlarmIcon />} // Icona per RPE (forza)
            sx={{ justifyContent: 'flex-start' }}
          >
            RPE
          </Button>
        </Link>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          Sport Manager
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Benvenuto nella dashboard!
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
