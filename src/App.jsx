import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/main/Home';
import './App.css';
import SideBar from './components/sideBar/SideBar';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content">
        <SideBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='*' element={<ErrorPage />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
