"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, Link } from "react-router-dom";

export default function ReservationDetails() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const docRef = doc(db, "reservations", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReservation({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert("Reservation not found");
      }
    };

    fetchReservation();
  }, [id]);

  if (!reservation) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Reservation Details</h1>

      <p><b>Name:</b> {reservation.name}</p>
      <p><b>Phone:</b> {reservation.phone}</p>
      <p><b>Email:</b> {reservation.email || "N/A"}</p>
      <p><b>Date:</b> {reservation.date}</p>
      <p><b>Reason:</b> {reservation.reason}</p>
      <p><b>Created At:</b> {reservation.createdAt?.toDate().toLocaleString() || "N/A"}</p>

      <Link
        to="/reservations"
        className="mt-6 inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
      >
        Back to Reservations List
      </Link>
    </div>
  );
}
