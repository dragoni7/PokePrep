import { Box, Typography } from '@mui/material';

interface HeroProps {
  children: React.ReactNode;
}

export default function Hero(props: HeroProps) {
  return (
    <Box
      id="hero"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
        width: '100%',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          fontSize: 'clamp(3rem, 10vw, 3.5rem)',
        }}
      >
        I am fighting a &nbsp;
        {props.children}
        &nbsp;Pokemon
      </Typography>
    </Box>
  );
}
