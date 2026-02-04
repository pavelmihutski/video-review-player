import { Toaster } from 'sonner';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import { theme } from '@/theme';

import { Player } from './pages';
import { AllProviders } from './providers';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export function App() {
  return (
    <AllProviders>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: theme.colors.background.secondary,
              border: `1px solid ${theme.colors.border.primary}`,
              color: theme.colors.text.primary,
            },
          }}
        />
        <Player />
      </ThemeProvider>
    </AllProviders>
  );
}
