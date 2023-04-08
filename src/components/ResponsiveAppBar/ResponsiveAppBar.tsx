import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NotesCounter from '../NotesCounter/NotesCounter';
import AssignmentIcon from '@mui/icons-material/Assignment';

function ResponsiveAppBar() {
  return (
    <AppBar position="static" sx={{ marginBottom: '20px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssignmentIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            GrowNotes
          </Typography>

          <AssignmentIcon
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1
            }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              flex: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            GrowNotes
          </Typography>
          <NotesCounter />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
