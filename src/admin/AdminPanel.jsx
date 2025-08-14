import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


export default function AdminPanel() {
    useAdminAuth(); // checks token and redirects if needed

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
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const IMGBB_API_KEY = "e239d2177a80323c4c5ea964ff7f03f8";

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

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    if (data.success) return data.data.url;
    else throw new Error("Image upload failed");
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

      await addDoc(collection(db, "products"), {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
        imageUrl,
        createdAt: serverTimestamp()
      });

      setMessage("✅ Product added successfully!");
      setProduct({
        name: "",
        category: "",
        description: "",
        quantity: 0,
        availability: true,
        price: 0,
        imageUrl: ""
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ Failed to add product");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-start justify-center p-6 pt-12">
      <div className="bg-gray-800 shadow-lg rounded-2xl w-full max-w-2xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition mb-6"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent">
          Admin Panel - Add Product
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              message.includes("✅")
                ? "bg-green-100 text-green-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Image */}
          <div>
            <label className="block mb-1 font-semibold">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 max-h-40 w-full object-contain rounded-lg border border-gray-600"
              />
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              min="0"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability"
              checked={product.availability}
              onChange={handleChange}
              className="h-5 w-5 accent-red-500"
            />
            <label className="font-semibold">Available</label>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              min="0"
              step="0.01"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 rounded-xl text-white font-bold transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-red-500 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
