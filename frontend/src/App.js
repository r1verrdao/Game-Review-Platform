import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import GameDetails from './pages/GameDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// A layout for public pages that still want the Navbar and Footer
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-cr_bg flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Route>

          {/* Public Routes without layout (Auth) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
