import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  MenuItem,
  styled,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 20px)`,
  backdropFilter: 'blur(24px)',
  border: '6px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.error.light, 0.5),
  boxShadow: theme.shadows[1],
  padding: '4px 6px',
}));

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 16px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 0,
            }}
          >
            {/* Icon Here */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                Type Helper
              </Button>
              <Button variant="text" color="info" size="small">
                Pokedex
              </Button>
              <Button variant="text" color="info" size="small">
                Option 3
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Type Helper</MenuItem>
                <MenuItem>Pokedex</MenuItem>
                <MenuItem>Option3</MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
