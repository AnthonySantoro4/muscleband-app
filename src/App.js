import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import OpenScreen from './components/openscreen';
import About from './components/about';
import AccountInformation from './components/accountinformation';
import ProtectedRoute from './components/ProtectedRoute';
import PreviousTrackings from './components/PreviousTrackings'; // ✅ NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenScreen />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountInformation />
          </ProtectedRoute>
        } />
        <Route path="/trackings" element={  // ✅ NEW ROUTE
          <ProtectedRoute>
            <PreviousTrackings />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
