import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Admin from './components/Admin';
import './styles/global.css';

// Rută protejată pentru utilizatorii autentificați (ex: profil)
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// Rută protejată exclusiv pentru conturile de administrator
function AdminRoute({ children }) {
  const { userProfile } = useAuth();
  return userProfile?.role === 'admin' ? children : <Navigate to="/" />;
}

// Structura internă a aplicației (Navbar, Conținutul Rutelor și Footer)
function AppContent() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/location" element={<Location />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminRoute><Admin /></AdminRoute></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Componenta principală exportată care îmbracă totul în Provideri de Stare
export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  );
}