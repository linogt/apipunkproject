import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from "./routes/Login.jsx"
import Beer from "./routes/Beer.jsx"
import Register from "./routes/Register.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
  },
  { 
    path:"beer",
    element: <Beer/>
  },
  {
    path:"register",
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
