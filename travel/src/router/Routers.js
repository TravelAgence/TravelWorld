import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import List from "../components/AdminDashboard/pages/list/List";
import Single from "../components/AdminDashboard/pages/single/Single";
import New from "../components/AdminDashboard/pages/new/New";
import { productInputs, userInputs } from "../components/AdminDashboard/formSource";
import Home2 from "../components/AdminDashboard/pages/home/Home";
import About from "../pages/About/About";
import Tours from "../pages/Tours";
import ProtectedRoute from "../context/ProtectedRoute"; // Import ProtectedRoute
import AccountActivation from "../components/auth/AcountActivation.jsx";

const Router = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/account-activation/:activationCode" element={<AccountActivation/>} />



      {/* Protected admin routes */}
      <Route path="/admin" element={<ProtectedRoute><Home2 /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><List /></ProtectedRoute>} />
      <Route path="/admin/users/:userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
      <Route path="/admin/users/new" element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><List /></ProtectedRoute>} />
      <Route path="/admin/products/:productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
      <Route path="/admin/products/new" element={<ProtectedRoute><New inputs={productInputs} title="Add New Product" /></ProtectedRoute>} />

      {/* Redirect for unknown paths */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Router;