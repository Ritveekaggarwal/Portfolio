import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import LandingPage from '../pages/LandingPage'
import PortfolioPage from '../pages/PortfolioPage'

import AdminSetupPage from '../pages/AdminSetupPage'
import AdminLoginPage from '../pages/AdminLoginPage'
import AdminPage from '../pages/AdminPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/portfolio"
          element={<PortfolioPage />}
        />

        {/* Admin */}

        <Route
          path="/admin/setup"
          element={<AdminSetupPage />}
        />

        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter