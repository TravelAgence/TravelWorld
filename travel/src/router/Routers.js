import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import List from "../components/AdminDashboard/pages/list/List";
import Single from "../components/AdminDashboard/pages/single/Single";
import New from "../components/AdminDashboard/pages/new/New";
import {
  productInputs,
  userInputs,
} from "../components/AdminDashboard/formSource";
import Home2 from "../components/AdminDashboard/pages/home/Home";
import About from '../pages/About/About'
import Tours from "../pages/Tours";
import AccountActivation from "../components/auth/AcountActivation";
const Router = () => {
  return (
    <Routes>
      {/* Routes principales */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/account-activation/:activationCode" element={<AccountActivation />} />


      <Route path="/admin">
        <Route index element={<Home2 />} />
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="products">
          <Route index element={<List />} />
          <Route path=":productId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Route>
      </Route>

      {/* Redirection pour les chemins inconnus */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Router;
