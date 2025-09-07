import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/Authentication.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthContextProvider>
      <App/>
  </AuthContextProvider>
  </StrictMode>,
)
