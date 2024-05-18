import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { UserContextProvider } from './context/userContext.jsx';

const styles = {
  global: (props) => ({
    body: { bg: mode('white', '#000')(props) },
    color: mode('gray.800', 'whiteAlpha.900')(props)
  })
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ChakraProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
