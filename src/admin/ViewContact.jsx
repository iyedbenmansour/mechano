"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Tag, MessageCircle, Clock } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


export default function ViewContact() {
    useAdminAuth(); // checks token and redirects if needed

  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "contactMessages", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContact({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("Contact message not found");
          navigate("/contacts");
        }
      } catch (error) {
        console.error("Error fetching contact message:", error);
        alert("Failed to load contact message details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Contact message not found.</p>
        <button
          onClick={() => navigate("/contacts")}
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          <ArrowLeft size={20} /> Back to Contacts
        </button>
      </div>
    );
  }

  const createdAtDate = contact.createdAt?.toDate ? contact.createdAt.toDate() : null;

  // Reusable component for consistent styling of detail items
  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg shadow-inner">
      <div className="p-2 rounded-full bg-red-500 text-gray-900 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="font-semibold text-lg">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          Message from {contact.name}
        </h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      {/* Main Content Card */}
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 space-y-6">
        <DetailItem
          icon={<User />}
          label="From"
          value={contact.name}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem
            icon={<Mail />}
            label="Email"
            value={contact.email || "N/A"}
          />
          <DetailItem
            icon={<Phone />}
            label="Phone Number"
            value={contact.phone || "N/A"}
          />
        </div>
        <DetailItem
          icon={<Tag />}
          label="Subject"
          value={contact.subject || "No subject"}
        />
        <DetailItem
          icon={<MessageCircle />}
          label="Message"
          value={contact.message}
        />
        <DetailItem
          icon={<Clock />}
          label="Sent At"
          value={createdAtDate ? createdAtDate.toLocaleString() : "Unknown"}
        />
      </div>
    </div>
  );
}