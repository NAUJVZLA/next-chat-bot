// pages/_app.tsx
import '../styles/chatbot.css'; // Asegúrate de ajustar la ruta según tu estructura de directorios
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
