import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  // wrapping our whole app.jsx file with context provider so that we can access 
  // the context anywhere in our project
  <ContextProvider>
    <App />
  </ContextProvider>,
)
