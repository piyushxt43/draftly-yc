import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './pages/Landing'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>
)
