"use client";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { ArrowLeft, Save } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


export default function UpdateProduct() {
    useAdminAuth(); // checks token and redirects if needed

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    quantity: 0,
    availability: true,
    price: 0,
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const IMGBB_API_KEY = "e239d2177a80323c4c5ea964ff7f03f8";

  useEffect(() => {
    async function fetchProduct() {
      setFetching(true);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          setMessage("❌ Product not found");
        }
      } catch (error) {
        setMessage("❌ Failed to fetch product details.");
        console.error("Error fetching product:", error);
      } finally {
        setFetching(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = product.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImageToImgbb(imageFile);
      }

      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
        imageUrl,
        updatedAt: serverTimestamp()
      });

      setMessage("✅ Product updated successfully!");
      setImageFile(null);

      setTimeout(() => navigate("/products"), 1500);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("❌ Failed to update product");
    }

    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <p className="text-gray-400">Fetching product data...</p>
      </div>
    );
  }

  if (message.startsWith("❌ Product not found")) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-gray-100">
        <p className="text-xl font-semibold mb-4">{message}</p>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          <ArrowLeft size={20} /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Update Product
          </h1>
          <div className="w-24"></div> {/* Spacer */}
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 shadow-xl rounded-2xl w-full p-8 border border-gray-700">
          {message && (
            <div className={`mb-4 p-4 rounded-xl text-center font-bold ${
              message.startsWith("✅") ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload and Preview */}
            <div className="bg-gray-700 p-4 rounded-xl">
              <label className="block text-gray-200 font-medium mb-2">Product Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-gray-900 hover:file:bg-yellow-400"
                />
                {(imageFile || product.imageUrl) && (
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : product.imageUrl}
                    alt="Product preview"
                    className="w-24 h-24 object-cover rounded-xl border border-gray-600"
                  />
                )}
              </div>
            </div>

            {/* Product Details Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-200 font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-200 font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                rows="4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-200 font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="availability"
                checked={product.availability}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
              />
              <label className="text-gray-200 font-medium">Available</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-all duration-200 ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 hover:scale-105"
              }`}
              disabled={loading}
            >
              <Save size={20} />
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}