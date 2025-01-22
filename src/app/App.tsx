import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import TypeOptimizer from '@/features/TypeCalculator/components/TypeOptimizer';
import TypeSelector from '@/features/TypeCalculator/components/TypeSelector';
import AppTheme from '@/theme/AppTheme';
import { Container, CssBaseline } from '@mui/material';

export default function App(props: any) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme>
        <NavBar />
        <Container
          maxWidth="lg"
          sx={(theme) => ({
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <Hero>
            <TypeSelector />
          </Hero>
          <div>
            <TypeOptimizer />
          </div>
        </Container>
      </CssBaseline>
    </AppTheme>
  );
}
