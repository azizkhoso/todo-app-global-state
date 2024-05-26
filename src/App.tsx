import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {Provider} from 'jotai';
import {RouterProvider} from 'react-router-dom';

import router from './Routes';

function App() {
  return (
    <ChakraProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
