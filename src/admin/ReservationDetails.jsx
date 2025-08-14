"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, Calendar, Info, Clock } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path

export default function ReservationDetails() {
    useAdminAuth(); // checks token and redirects if needed

  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "reservations", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReservation({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("Reservation not found");
          navigate("/reservations");
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
        alert("Failed to load reservation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Reservation not found.</p>
        <button
          onClick={() => navigate("/reservations")}
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          <ArrowLeft size={20} /> Back to Reservations
        </button>
      </div>
    );
  }

  const createdAtDate = reservation.createdAt?.toDate ? reservation.createdAt.toDate() : null;

  // A reusable component for consistent styling of each detail item
  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-inner">
      <div className="p-2 rounded-full bg-red-500 text-gray-900">
        {icon}
      </div>
      <div>
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
          Reservation Details
        </h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      {/* Reservation Details Card */}
      <div className="max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 space-y-6">
        <DetailItem
          icon={<User />}
          label="Name"
          value={reservation.name}
        />
        <DetailItem
          icon={<Phone />}
          label="Phone Number"
          value={reservation.phone}
        />
        <DetailItem
          icon={<Mail />}
          label="Email"
          value={reservation.email || "N/A"}
        />
        <DetailItem
          icon={<Calendar />}
          label="Reservation Date"
          value={reservation.date}
        />
        <DetailItem
          icon={<Info />}
          label="Reason"
          value={reservation.reason}
        />
        <DetailItem
          icon={<Clock />}
          label="Created At"
          value={createdAtDate ? createdAtDate.toLocaleString() : "N/A"}
        />
      </div>
    </div>
  );
}