import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
