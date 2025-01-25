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
        pb: { xs: 4, sm: 6 },
        width: '100%',
      }}
    >
      <Typography
        variant="h1"
        sx={(theme) => ({
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          fontSize: { xs: 'clamp(2rem, 10vw, 2.5rem)', md: 'clamp(3rem, 10vw, 3.5rem)' },
          borderRadius: 2,
          backgroundColor: theme.palette.primary.highlight,
          p: 2,
        })}
      >
        I am fighting a &nbsp;
        {props.children}
        &nbsp;Pokemon
      </Typography>
    </Box>
  );
}
