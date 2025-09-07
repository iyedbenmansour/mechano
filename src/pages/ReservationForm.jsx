import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Car,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ReservationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    carMatricule: "",
    reason: "Consultation",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [reservedTimes, setReservedTimes] = useState([]); // NEW

  const reasons = [
    "Consultation",
    "Contrôle Technique", 
    "Service d'Entretien",
    "Réparation d'Urgence",
    "Service de Suivi",
    "Diagnostic Technique",
    "Service Garantie"
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const monthNames = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  const dayNames = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

  // Fetch reserved times whenever selectedDate changes
  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (!selectedDate) return;
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const q = query(
          collection(db, "reservations"),
          where("date", "==", formattedDate)
        );
        const querySnapshot = await getDocs(q);
        const times = querySnapshot.docs.map(doc => doc.data().time);
        setReservedTimes(times);
      } catch (error) {
        console.error("Erreur lors du chargement des heures réservées:", error);
      }
    };

    fetchReservedTimes();
  }, [selectedDate]);

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // reset selected time when date changes
  };

  const handleTimeSelect = (time) => {
    if (!reservedTimes.includes(time)) {
      setSelectedTime(time);
    }
  };

  const proceedToForm = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(2);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Le nom est requis";
    if (!form.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^[+]?[\d\s\-\(\)]{8,}$/.test(form.phone.trim())) {
      newErrors.phone = "Veuillez saisir un numéro de téléphone valide";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Veuillez saisir une adresse email valide";
    }
    if (!form.carMatricule.trim()) {
      newErrors.carMatricule = "La plaque d'immatriculation est requise";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setMessage("");

    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      await addDoc(collection(db, "reservations"), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email ? form.email.trim() : null,
        carMatricule: form.carMatricule.trim(),
        date: formattedDate,
        time: selectedTime,
        reason: form.reason,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      setMessage("Échec de la création de la réservation. Veuillez réessayer.");
    }

    setLoading(false);
  };

  const resetForm = () => {
    setSuccess(false);
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime("");
    setForm({
      name: "",
      phone: "",
      email: "",
      carMatricule: "",
      reason: "Consultation",
    });
    setReservedTimes([]);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-20">
          <div className="max-w-2xl mx-auto p-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Réservation Confirmée !
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Merci d'avoir pris rendez-vous avec nous. Nous vous contacterons dans les 24 heures pour confirmer les détails de votre rendez-vous.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                Détails de la Réservation
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Date :</span>
                  <span className="text-gray-900 font-semibold">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Heure :</span>
                  <span className="text-gray-900 font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Service :</span>
                  <span className="text-blue-600 font-semibold">{form.reason}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Statut :</span>
                  <span className="text-orange-600 font-semibold">En Attente de Confirmation</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Programmer un Autre Rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Planifiez Votre Rendez-vous
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Réservez une consultation avec notre équipe experte de service automobile
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>1</div>
              <span className="ml-2 font-medium">Choisir Date et Heure</span>
            </div>
            <div className={`w-16 h-1 ${currentStep > 1 ? 'bg-gradient-to-r from-blue-600 to-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>2</div>
              <span className="ml-2 font-medium">Remplir Détails</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                {/* Calendar */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Calendar Section */}
                  <div>
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {dayNames.map(day => (
                        <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 capitalize">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentMonth).map((date, index) => (
                        <button
                          key={index}
                          onClick={() => date && !isPastDate(date) && handleDateSelect(date)}
                          disabled={!date || isPastDate(date)}
                          className={`p-3 text-sm rounded-lg transition-all ${
                            !date 
                              ? 'invisible' 
                              : isPastDate(date)
                              ? 'text-gray-300 cursor-not-allowed'
                              : selectedDate && selectedDate.toDateString() === date.toDateString()
                              ? 'bg-blue-600 text-white font-semibold'
                              : isToday(date)
                              ? 'bg-orange-50 text-orange-600 font-semibold border border-orange-200'
                              : 'hover:bg-blue-50 hover:text-blue-600 text-gray-900'
                          }`}
                        >
                          {date && date.getDate()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    {selectedDate ? (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Heures Disponibles</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {formatDate(selectedDate)}
                        </p>
                        <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                          {timeSlots.map(time => {
                            const isReserved = reservedTimes.includes(time);
                            return (
                              <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                disabled={isReserved}
                                className={`p-3 text-sm rounded-lg border transition-all ${
                                  isReserved
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : selectedTime === time
                                    ? 'bg-orange-600 text-white border-orange-600'
                                    : 'bg-white hover:bg-orange-50 text-gray-700 border-gray-200 hover:border-orange-300'
                                }`}
                              >
                                {time} {isReserved && "(Réservé)"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Veuillez d'abord sélectionner une date</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Continue Button */}
                {selectedDate && selectedTime && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={proceedToForm}
                      className="bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
                    >
                      Continuer vers les Détails
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Step 2: Form */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Complétez Votre Réservation</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-medium">
                      {formatDate(selectedDate)} à {selectedTime}
                    </p>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-blue-600 text-sm hover:underline mt-1"
                    >
                      Changer la date/heure
                    </button>
                  </div>
                </div>

                {message && (
                  <div className="mb-6 p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <p className="text-orange-800 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {message}
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Entrez votre nom complet"
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.name ? 'border-orange-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-orange-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Entrez votre numéro de téléphone"
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.phone ? 'border-orange-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-orange-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Adresse Email (optionnel)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Entrez votre adresse email"
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.email ? 'border-orange-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-orange-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Car Matricule Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Car className="w-4 h-4 inline mr-2" />
                      Immatriculation du Véhicule *
                    </label>
                    <input
                      type="text"
                      name="carMatricule"
                      value={form.carMatricule}
                      onChange={handleChange}
                      placeholder="Entrez le numéro d'immatriculation de votre véhicule"
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.carMatricule ? 'border-orange-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.carMatricule && (
                      <p className="mt-1 text-sm text-orange-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.carMatricule}
                      </p>
                    )}
                  </div>

                  {/* Reason Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Type de Service *
                    </label>
                    <select
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      {reasons.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-4 px-6 font-semibold text-lg rounded-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                      loading
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Confirmer la Réservation
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Vos informations sont sécurisées et ne seront utilisées que pour vous contacter concernant votre rendez-vous.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />  
    </div>
  );
}