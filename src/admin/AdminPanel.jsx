import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth";

export default function AdminPanel() {
  useAdminAuth();

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
  const [csvFile, setCsvFile] = useState(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvMessage, setCsvMessage] = useState("");

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

  const handleCsvChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
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

  const parseCsv = (csvText) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const products = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length === headers.length && values[0]) { // Skip empty rows
        const product = {};
        headers.forEach((header, index) => {
          const value = values[index];
          switch (header.toLowerCase()) {
            case 'name':
              product.name = value;
              break;
            case 'category':
              product.category = value;
              break;
            case 'description':
              product.description = value;
              break;
            case 'quantity':
              product.quantity = parseInt(value) || 0;
              break;
            case 'availability':
              product.availability = value.toLowerCase() === 'true' || value === '1';
              break;
            case 'price':
              product.price = parseFloat(value) || 0;
              break;
            case 'imageurl':
              product.imageUrl = value;
              break;
            default:
              break;
          }
        });
        products.push(product);
      }
    }
    return products;
  };

  const handleCsvSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setCsvMessage("❌ Please select a CSV file");
      return;
    }

    setCsvLoading(true);
    setCsvMessage("");

    try {
      const csvText = await csvFile.text();
      const products = parseCsv(csvText);

      if (products.length === 0) {
        setCsvMessage("❌ No valid products found in CSV");
        setCsvLoading(false);
        return;
      }

      let successCount = 0;
      let failCount = 0;

      for (const product of products) {
        try {
          // Validate required fields
          if (!product.name || !product.category) {
            failCount++;
            continue;
          }

          await addDoc(collection(db, "products"), {
            ...product,
            createdAt: serverTimestamp()
          });
          successCount++;
        } catch (error) {
          console.error("Error adding product:", error);
          failCount++;
        }
      }

      setCsvMessage(`✅ Import completed! ${successCount} products added successfully${failCount > 0 ? `, ${failCount} failed` : ''}`);
      setCsvFile(null);
      // Reset file input
      const fileInput = document.getElementById('csvFileInput');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Error processing CSV:", error);
      setCsvMessage("❌ Failed to process CSV file");
    }

    setCsvLoading(false);
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
      <div className="bg-gray-800 shadow-lg rounded-2xl w-full max-w-4xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition mb-6"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent">
          Admin Panel - Add Products
        </h1>

        {/* CSV Import Section */}
        <div className="bg-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Upload size={24} />
            Bulk Import from CSV
          </h2>
          
          <div className="mb-4 p-3 bg-blue-900/50 rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-200">
              <strong>CSV Format:</strong> name, category, description, quantity, availability, price, imageUrl
              <br />
              <strong>Note:</strong> availability should be 'true' or 'false', quantity and price should be numbers
            </p>
          </div>

          {csvMessage && (
            <div
              className={`mb-4 p-3 rounded-lg text-center ${
                csvMessage.includes("✅")
                  ? "bg-green-100 text-green-900"
                  : "bg-red-100 text-red-900"
              }`}
            >
              {csvMessage}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Select CSV File</label>
              <input
                id="csvFileInput"
                type="file"
                accept=".csv"
                onChange={handleCsvChange}
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleCsvSubmit}
              className={`w-full p-3 rounded-xl text-white font-bold transition flex items-center justify-center gap-2 ${
                csvLoading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105"
              }`}
              disabled={csvLoading}
            >
              <FileText size={20} />
              {csvLoading ? "Importing..." : "Import Products from CSV"}
            </button>
          </div>
        </div>

        {/* Individual Product Form */}
        <div className="bg-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Add Single Product</h2>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Image */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="mt-2 max-h-40 w-full object-contain rounded-lg border border-gray-500"
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
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-semibold">Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-600 text-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
                step="0.01"
              />
            </div>

            {/* Availability */}
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="availability"
                checked={product.availability}
                onChange={handleChange}
                className="h-5 w-5 accent-red-500"
              />
              <label className="font-semibold">Available</label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={`md:col-span-2 w-full p-3 rounded-xl text-white font-bold transition ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-red-500 hover:scale-105"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}