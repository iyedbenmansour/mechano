import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ArrowRight,
  Wrench,
  Shield,
  Star
} from "lucide-react";

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    reason: "Consultation", // default reason
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const reasons = [
    "Consultation",
    "Follow-up Appointment", 
    "New Client Meeting",
    "Emergency Visit",
    "Maintenance Service",
    "Design Review",
    "Technical Support"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s\-\(\)]{8,}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "reservations"), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        date: form.date,
        reason: form.reason,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        date: "",
        reason: "Consultation",
      });
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Error creating reservation:", error);
      setMessage("Failed to create reservation. Please try again.");
    }

    setLoading(false);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-2xl mx-auto p-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl font-black mb-4">
                <span className="text-green-500">RESERVATION</span>
                <br />
                <span className="text-white">CONFIRMED!</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Thank you for scheduling with us. We'll contact you within 24 hours to confirm your appointment details.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-green-500" />
                Reservation Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white font-semibold">{form.date}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400">Service:</span>
                  <span className="text-green-400 font-semibold">{form.reason}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-400 font-semibold">Pending Confirmation</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setSuccess(false)}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Schedule Another Appointment
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-red-500">SCHEDULE</span>
            <br />
            <span className="text-white">CONSULTATION</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Book a professional consultation with our expert mechanical engineering team
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
            <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Quick Response</h3>
            <p className="text-gray-400 text-sm">24-hour confirmation guarantee</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Expert Team</h3>
            <p className="text-gray-400 text-sm">Certified engineering professionals</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
            <Star className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Premium Service</h3>
            <p className="text-gray-400 text-sm">Tailored engineering solutions</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-red-500" />
                Reservation Form
              </h2>
              <p className="text-gray-400">Fill out the details below to schedule your appointment</p>
            </div>

            {message && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
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

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
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

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address (optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-700 focus:border-red-500 focus:ring-red-500/20'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.date 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-700 focus:border-red-500 focus:ring-red-500/20'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Reason Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Service Type *
                </label>
                <select
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500/20 transition-all duration-200"
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason} className="bg-gray-800">
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  loading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white transform hover:scale-105 shadow-2xl shadow-red-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    Schedule Appointment
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-center text-sm text-gray-400">
                <Shield className="w-4 h-4 inline mr-1" />
                Your information is secure and will only be used to contact you regarding your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}