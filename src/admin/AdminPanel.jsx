import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AdminPanel() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    quantity: 0,
    availability: true,
    price: 0,
    imageUrl: ""  // added to store image URL
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // store selected file

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

      // Upload image if a new file is selected
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel - Add Product</h1>

        {message && (
          <div className="mb-4 p-2 rounded text-center bg-gray-100">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Other fields unchanged */}

          <div>
            <label className="block text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 max-h-40 object-contain"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              min="0"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability"
              checked={product.availability}
              onChange={handleChange}
            />
            <label className="text-gray-700">Available</label>
          </div>

          <div>
            <label className="block text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              min="0"
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
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
