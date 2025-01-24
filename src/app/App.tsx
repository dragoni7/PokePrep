import NavBar from '@/components/NavBar';
import AppTheme from '@/theme/AppTheme';
import { Container, CssBaseline, GlobalStyles } from '@mui/material';
import { createRouter } from './routes';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

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

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

export default function App(props: any) {
  return (
    <>
      {inputGlobalStyles}
      <AppTheme {...props}>
        <CssBaseline enableColorScheme>
          <NavBar />
          <Container
            maxWidth="lg"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AppRouter />
          </Container>
        </CssBaseline>
      </AppTheme>
    </>
  );
}
