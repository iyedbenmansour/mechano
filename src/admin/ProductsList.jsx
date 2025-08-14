"use client";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Trash2, Edit, Plus, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


export default function ProductsList() {
    useAdminAuth(); // checks token and redirects if needed

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch products in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Delete a product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      {/* Back Button and Add Button Container */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigates to the previous page in history
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md mb-4 sm:mb-0"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent flex-grow">
          Product Inventory
        </h1>

        {/* Add Button */}
        <Link
          to="/addproduct"
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg"
        >
          <Plus size={20} /> Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading products...</div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found. Add a new one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-48 overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                    {product.name}
                  </h2>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    product.availability ? 'bg-green-500 text-green-900' : 'bg-red-500 text-red-900'
                  }`}>
                    {product.availability ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description || "No description provided."}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <p><span className="font-semibold text-gray-400">Category:</span> {product.category}</p>
                  <p><span className="font-semibold text-gray-400">Quantity:</span> {product.quantity}</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-900 border-t border-gray-700">
                <p className="text-2xl font-bold text-yellow-400">${parseFloat(product.price).toFixed(2)}</p>
                <div className="flex space-x-2">
                  <Link
                    to={`/update-product/${product.id}`}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white shadow-md"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white shadow-md"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}