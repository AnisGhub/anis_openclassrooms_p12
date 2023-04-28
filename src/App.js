import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './pages/main/Main' ;
import './App.css';
import SideBar from './components/sideBar/SideBar';

function App() {
  return (
    <BrowserRouter>
      <div className='container'> 
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path='*' element={<ErrorPage />} /> */}
        </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
