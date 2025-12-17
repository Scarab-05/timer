import { AppProps } from 'next/app';
import { TimerProvider } from '../context/TimerProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TimerProvider>
      <Component {...pageProps} />
    </TimerProvider>
  );
}

export default MyApp;