import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import PokeDex from '@/features/PokeDex/components/PokeDex';
import TypeCalculator from '@/features/TypeCalculator/components/TypeCalculator';
import TypeSelector from '@/features/TypeCalculator/components/TypeSelector';
import { RootState } from '@/store';
import AppTheme from '@/theme/AppTheme';
import { Container, CssBaseline, GlobalStyles } from '@mui/material';
import { useSelector } from 'react-redux';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      body: {
        background: 'linear-gradient(145deg, #117090 20%, #17868f 50%, #117090 80%)',
        height: '100%',
        margin: 0,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
    }}
  />
);

export default function App(props: any) {
  const view = useSelector((state: RootState) => state.viewConfig.view);

  return (
    <>
      {inputGlobalStyles}
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
            })}
          >
            {view === 0 ? (
              <>
                <Hero>
                  <TypeSelector />
                </Hero>
                <TypeCalculator />
              </>
            ) : view === 1 ? (
              <PokeDex />
            ) : view === 2 ? (
              false
            ) : (
              <div>Error, content not found</div>
            )}
          </Container>
        </CssBaseline>
      </AppTheme>
    </>
  );
}
