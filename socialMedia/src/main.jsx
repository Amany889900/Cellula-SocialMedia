import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/Authentication.jsx';
import { Provider } from 'react-redux';
import { store } from './Store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthContextProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </AuthContextProvider>
  </StrictMode>,
)
