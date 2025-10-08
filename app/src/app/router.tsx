import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Watchlist } from '../pages/Watchlist'
import { Movies } from '../pages/Movies'
import { MovieDetails } from '../pages/MovieDetails'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Privacy } from '../pages/Privacy'
import { Terms } from '../pages/Terms'
import { Cookies } from '../pages/Cookies'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/watchlist', element: <Watchlist /> },
      { path: '/movies', element: <Movies /> },
      { path: '/movies/:id', element: <MovieDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Register /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '/cookies', element: <Cookies /> },
    ],
  },
])
