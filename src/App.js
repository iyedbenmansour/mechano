// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel"; // Ensure this file exists
import ProductsList from "./admin/ProductsList";
import UpdateProduct from "./admin/UpdateProduct"; // Ensure this file exists
import CommandsList from "./admin/CommandsList";
import ViewCommand from "./admin/ViewCommand"; // Ensure this file exists
import ReservationsList from "./admin/ReservationsList";
import ReservationDetails from "./admin/ReservationDetails";
import ViewAllContacts from "./admin/ViewAllContacts";
import ViewContact from "./admin/ViewContact";
import Admin from "./admin/Admin"; // Ensure this file exists

import ProductList from "./pages/Products";
import ViewProduct from "./pages/ViewProduct"; // Ensure this file exists
import ReservationForm from "./pages/ReservationForm";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ServicePage from "./pages/ServicePage";
import Login from "./admin/login";
import Panier from "./pages/pannier";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/addproduct" element={<AdminPanel />} />
        <Route path="/productslist" element={<ProductsList />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/commands" element={<CommandsList />} />
        <Route path="/command/:id" element={<ViewCommand />} />
        <Route path="/reservations" element={<ReservationsList />} />
        <Route path="/reservation/:id" element={<ReservationDetails />} />
        <Route path="/contacts" element={<ViewAllContacts />} />
        <Route path="/contact/:id" element={<ViewContact />} />
        <Route path="/login" element={<Login />} />


        {/* Public routes */}

        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/panier" element={<Panier />} />



        {/* Default route */}
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
