import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoginContextProvider } from './hooks/LoginContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DataContextProvider } from './hooks/DataContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider>
    <DataContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContextProvider>
    </LoginContextProvider>
  </React.StrictMode>,
)
