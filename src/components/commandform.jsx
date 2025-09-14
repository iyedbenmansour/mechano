// CommandForm.jsx
import React, { useState } from 'react';
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  X, ShoppingCart, User, Phone, DollarSign,
  CheckCircle, AlertCircle, Save
} from "lucide-react";

export default function CommandForm({ product, quantity, onClose, onOrderSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Le nom est obligatoire";
    else if (name.trim().length < 2) newErrors.name = "Le nom doit contenir au moins 2 caractères";

    if (!phone.trim()) newErrors.phone = "Le numéro de téléphone est obligatoire";
    else if (!/^[+]?[\d\s\-\(\)]{8,}$/.test(phone.trim()))
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        status: "en attente"
      });

      setSuccess(true);
      // Call onOrderSuccess when order is successful
      if (onOrderSuccess) {
        onOrderSuccess();
      }
      // No automatic close
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande : ", error);
      setErrors({ submit: "Échec de la commande. Veuillez réessayer." });
    }

    setLoading(false);
  };

  const handleSaveAndClose = () => {
    onClose();
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  if (success) {
    return (
      <div className="p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Commande passée avec succès !</h2>
        <p className="text-gray-600 mb-6">
          Merci pour votre commande. Nous vous contacterons prochainement pour confirmer.
        </p>
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm">
            <span>Produit :</span>
            <span className="font-medium">{product.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Quantité :</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total :</span>
            <span className="font-bold text-orange-600">{totalPrice} TND</span>
          </div>
        </div>
        
        {/* Save and Close button - only way to close after success */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={handleSaveAndClose}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer et fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* En-tête */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-orange-500" />
          Passer une commande
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Infos produit */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Produit :</span>
          <span className="font-medium">{product.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Prix unitaire :</span>
          <span className="text-orange-600 font-semibold">{product.price} TND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Quantité :</span>
          <span>{quantity}</span>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 inline mr-1" />
            Nom complet *
          </label>
          <input
            type="text"
            placeholder="Entrez votre nom complet"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-sm ${
              errors.name ? "border-orange-500 focus:ring-orange-500" : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-orange-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="w-4 h-4 inline mr-1" />
            Numéro de téléphone *
          </label>
          <input
            type="tel"
            placeholder="Entrez votre numéro de téléphone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-sm ${
              errors.phone ? "border-orange-500 focus:ring-orange-500" : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-orange-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Prix total */}
        <div className="bg-gray-50 border rounded-md p-3 flex justify-between">
          <span className="flex items-center gap-1 text-gray-700">
            <DollarSign className="w-4 h-4 text-orange-500" /> Total :
          </span>
          <span className="text-lg font-bold text-orange-600">{totalPrice} TND</span>
        </div>

        {/* Erreur soumission */}
        {errors.submit && (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-2 text-xs text-orange-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.submit}
          </div>
        )}

        {/* Boutons actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border rounded-md text-gray-700 hover:bg-gray-100 text-sm"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md text-white text-sm font-medium flex items-center justify-center gap-1 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-500"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Traitement...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Confirmer la commande
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          En passant cette commande, vous acceptez nos conditions. Nous vous contacterons bientôt.
        </p>
      </form>
    </div>
  );
}