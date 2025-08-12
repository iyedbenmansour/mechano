"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reservations"), (snapshot) => {
      setReservations(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsub();
  }, []);

  if (reservations.length === 0) return <p className="p-4">No reservations found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Reservations</h1>
      <ul className="space-y-4">
        {reservations.map((r) => (
          <li
            key={r.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p><b>Name:</b> {r.name}</p>
              <p><b>Phone:</b> {r.phone}</p>
              <p><b>Date:</b> {r.date}</p>
              <p><b>Reason:</b> {r.reason}</p>
            </div>
            <Link
              to={`/reservation/${r.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
