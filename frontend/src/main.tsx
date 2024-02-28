import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import ContextoProvider from './contexts/ContextProvide.jsx'
import App from './App.tsx'
import './index.css'
import router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <ContextoProvider>
      <RouterProvider router={router} />
    </ContextoProvider>
  </React.StrictMode>,
)
