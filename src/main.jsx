import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';   // ← ADD THIS LINE

// import "./i18n";



// ✅ Use an EXISTING theme
import "primereact/resources/themes/mdc-light-indigo/theme.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
