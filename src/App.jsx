import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import Login from "./pages/admin/auth/Login";
import CreatePost from "./pages/admin/createpost/CreatePost";
import Dashboard from "./pages/dashboard/Dashboard";
import UpdatePost from "./components/Dashboard/updatePost/UpdatePost";
import Profile from "./pages/profile/Profile";
import { Route, Routes } from "react-router-dom";
import UserAdmin from "./pages/user-admin/user-admin";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post/:id" element={<CreatePost />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin" element={<UserAdmin />} />
      </Routes>
    </div>
  );
};

export default App;
