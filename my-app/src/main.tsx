import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';

// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root');

// 👇️ if you use TypeScript, add non-null (!) assertion operator
const root = createRoot(rootElement!);

root.render(
  
  <StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </StrictMode>,
);