import React from 'react'
import './App.css';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog'
import Login from './pages/admin/auth/Login'
import DashBoard from './pages/admin/dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return ( 
    <div className='container'>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/blog/:id" element={<Blog/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard/:id" element={<DashBoard />} />
      </Routes>
    </div>
   );
}
 
export default App;
