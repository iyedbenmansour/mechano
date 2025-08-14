import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


export default function ViewAllContacts() {
    useAdminAuth(); // checks token and redirects if needed

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "contactMessages"), (snapshot) => {
      setContacts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    }, (error) => {
      console.error("Error fetching contact messages:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

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
          Contact Messages
        </h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      {/* Summary Card */}
      <div className="mb-8 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-4">
        <div className="p-3 bg-red-500 rounded-full">
          <Mail size={24} className="text-gray-900" />
        </div>
        <div>
          <p className="text-gray-400 uppercase text-sm">Total Messages</p>
          <p className="text-3xl font-bold">{contacts.length}</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading messages...</div>
      ) : contacts.length === 0 ? (
        <p className="text-center text-gray-400">No contact messages found.</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex justify-between items-center p-6 border border-gray-700 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-colors duration-200 shadow-lg"
            >
              <div>
                <p className="font-semibold text-lg text-yellow-400">
                  Subject: {contact.subject || "No subject"}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">From:</span> {contact.name} ({contact.email || "N/A"})
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Sent:{" "}
                  {contact.createdAt?.toDate
                    ? contact.createdAt.toDate().toLocaleString()
                    : "Unknown"}
                </p>
              </div>
              <Link
                to={`/contact/${contact.id}`}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
              >
                View
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}