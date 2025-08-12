import React, { useState } from "react";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { X, ShoppingCart, User, Phone, Hash, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

export default function CommandForm({ product, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s\-\(\)]{8,}$/.test(phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    } else if (quantity > 999) {
      newErrors.quantity = "Maximum quantity is 999";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await addDoc(collection(db, "commands"), {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        total: product.price * quantity,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        createdAt: Timestamp.now(),
        status: "pending"
      });

      setSuccess(true);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Error adding command: ", error);
      setErrors({ submit: "Failed to place order. Please try again." });
    }

    setLoading(false);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  if (success) {
    return (
      <div className="p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-400">
            Thank you for your order. We'll contact you shortly to confirm the details.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Product:</span>
              <span className="text-white font-semibold">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quantity:</span>
              <span className="text-white">{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Customer:</span>
              <span className="text-white">{name}</span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-red-400">Total:</span>
                <span className="text-red-400">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">Closing automatically...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-red-500" />
          Place Order
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Unit Price:</span>
          <span className="text-red-400 font-bold text-lg">${product.price}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors(prev => ({ ...prev, name: null }));
            }}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.name 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-700 focus:border-red-500 focus:ring-red-500/20'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
            }}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.phone 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-700 focus:border-red-500 focus:ring-red-500/20'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            <Hash className="w-4 h-4 inline mr-2" />
            Quantity *
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  if (errors.quantity) setErrors(prev => ({ ...prev, quantity: null }));
                }
              }}
              className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setQuantity(val);
                if (errors.quantity) setErrors(prev => ({ ...prev, quantity: null }));
              }}
              className={`flex-1 px-4 py-3 bg-gray-800 border rounded-lg text-white text-center focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.quantity 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-700 focus:border-red-500 focus:ring-red-500/20'
              }`}
            />
            <button
              type="button"
              onClick={() => {
                if (quantity < 999) {
                  setQuantity(quantity + 1);
                  if (errors.quantity) setErrors(prev => ({ ...prev, quantity: null }));
                }
              }}
              className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              disabled={quantity >= 999}
            >
              +
            </button>
          </div>
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Total Price */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-400" />
              Total Price:
            </span>
            <span className="text-2xl font-bold text-red-400">${totalPrice}</span>
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {errors.submit}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 border border-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white transform hover:scale-105 shadow-lg shadow-red-500/25'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Confirm Order
              </>
            )}
          </button>
        </div>

        {/* Info Text */}
        <p className="text-center text-sm text-gray-500">
          By placing this order, you agree to our terms and conditions.
          <br />
          We'll contact you within 24 hours to confirm your order.
        </p>
      </form>
    </div>
  );
}