// pages/_app.js
import '@/styles/globals.css';
import { Cormorant_Garamond, Lora, Raleway } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-heading',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-base',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ui',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
    <div
      className={`${cormorant.variable} ${lora.variable} ${raleway.variable}`}
    >
      <Component {...pageProps} />
      </div>
      </ThemeProvider>
  );
}

export default MyApp;
