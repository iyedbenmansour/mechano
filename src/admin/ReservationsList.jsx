import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  List,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


/**
 * ReservationsList component displays a list of reservations, grouped by date,
 * with the added ability to filter the list. It fetches real-time data from
 * a Firestore collection.
 */
export default function ReservationsList() {
    useAdminAuth(); // checks token and redirects if needed

  // State to hold the full list of reservations from the database
  const [reservations, setReservations] = useState([]);
  // State for the text entered into the filter input
  const [filterText, setFilterText] = useState("");
  // State for the date entered into the filter input
  const [dateFilter, setDateFilter] = useState("");
  // State to hold reservations grouped by date after filtering
  const [groupedReservations, setGroupedReservations] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Helper function to group an array of reservations by their date.
   * @param {Array} reservationsToGroup - The array of reservations to process.
   * @returns {Object} An object where keys are dates and values are arrays of reservations.
   */
  const groupReservationsByDate = (reservationsToGroup) => {
    return reservationsToGroup.reduce((acc, reservation) => {
      // Assuming reservation.date is a string in 'YYYY-MM-DD' format
      const date = reservation.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(reservation);
      return acc;
    }, {});
  };

  useEffect(() => {
    // Listen for real-time updates to the 'reservations' collection
    const unsub = onSnapshot(
      collection(db, "reservations"),
      (snapshot) => {
        const allReservations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(allReservations);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);

  useEffect(() => {
    // This effect runs whenever the main reservations, filterText, or dateFilter changes.
    // It filters the reservations and then regroups them.
    const filteredReservations = reservations.filter((reservation) => {
      const lowerCaseFilter = filterText.toLowerCase();

      // Check if the reservation matches the text filter
      const textMatches =
        reservation.name.toLowerCase().includes(lowerCaseFilter) ||
        (reservation.phone &&
          reservation.phone.toLowerCase().includes(lowerCaseFilter)) ||
        (reservation.reason &&
          reservation.reason.toLowerCase().includes(lowerCaseFilter));

      // Check if the reservation matches the date filter
      const dateMatches = dateFilter ? reservation.date === dateFilter : true;

      return textMatches && dateMatches;
    });

    const newGroupedReservations = groupReservationsByDate(filteredReservations);
    setGroupedReservations(newGroupedReservations);
  }, [reservations, filterText, dateFilter]); // Added dateFilter as a dependency

  // Get a sorted list of dates (the keys of the grouped object)
  const sortedDates = Object.keys(groupedReservations).sort();
  const totalFilteredReservations = Object.values(groupedReservations).flat().length;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      {/* Header and Back Button */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          All Reservations
        </h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by name, phone, or reason..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Summary Card */}
      <div className="mb-8 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-4">
        <div className="p-3 bg-red-500 rounded-full">
          <List size={24} className="text-gray-900" />
        </div>
        <div>
          <p className="text-gray-400 uppercase text-sm">
            Total Reservations
          </p>
          <p className="text-3xl font-bold">{totalFilteredReservations}</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading reservations...</div>
      ) : totalFilteredReservations === 0 ? (
        <p className="text-center text-gray-400">No reservations found.</p>
      ) : (
        <div className="grid gap-8">
          {sortedDates.map((date) => (
            <div key={date}>
              {/* Day Heading */}
              <h2 className="text-2xl font-bold text-gray-200 mb-4 pb-2 border-b border-gray-700">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>

              {/* Reservations for that day */}
              <div className="grid gap-4">
                {groupedReservations[date].map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-gray-700 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors duration-200 shadow-lg"
                  >
                    <div className="flex-grow mb-4 sm:mb-0">
                      <div className="flex items-center text-xl font-semibold text-yellow-400 mb-1">
                        <User size={20} className="mr-2" />
                        {r.name}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm mb-1">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        {r.phone}
                      </div>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-1">
                        Reason: {r.reason || "N/A"}
                      </p>
                    </div>
                    <Link
                      to={`/reservation/${r.id}`}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
                    >
                      View Details
                      <MoreHorizontal size={20} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
