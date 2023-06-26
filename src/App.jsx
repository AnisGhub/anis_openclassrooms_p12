import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/main/Home';
import './App.css';
import SideBar from './components/sideBar/SideBar';
import Activity from './pages/devInfos/Activity';
import AverageSessions from './pages/devInfos/AverageSessions';
import Performances from './pages/devInfos/Performances';
import User from './pages/devInfos/User';

/**
 * Root component of the application.
 * Configures the routes for different pages of the application using react router.
 *
 * @returns {JSX.Element} The JSX element representing the application.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content">
        <SideBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/user/:id/activity" element={<Activity />} />
            <Route path="/user/:id/average-sessions" element={<AverageSessions />} />
            <Route path="/user/:id/performance" element={<Performances />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
