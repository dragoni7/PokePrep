import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import TypeOptimizer from '@/components/TypeOptimizer';
import AppTheme from '@/theme/AppTheme';
import { CssBaseline } from '@mui/material';

export default function App(props: any) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme>
        <NavBar />
        <Hero />
        <div>
          <TypeOptimizer />
        </div>
      </CssBaseline>
    </AppTheme>
  );
}
