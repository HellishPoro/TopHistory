import { createRoot } from 'react-dom/client'
import 'dayjs/locale/en';
import './index.css'
import { App } from './App.jsx'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Provider } from 'react-redux';
import { store } from './features/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>
)
