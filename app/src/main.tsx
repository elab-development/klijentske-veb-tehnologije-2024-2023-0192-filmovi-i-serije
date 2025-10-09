import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './styles/global.css'
import { WatchlistProvider } from './state/WatchlistContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
    <WatchlistProvider>
      <RouterProvider router={router} />
    </WatchlistProvider>
  </React.StrictMode>
)