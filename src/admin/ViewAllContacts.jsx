import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function ViewAllContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "contactMessages"), (snapshot) => {
      setContacts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  if (contacts.length === 0)
    return <p className="p-4">No contact messages found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Contact Messages</h1>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="border p-4 mb-3 rounded hover:shadow-lg transition"
          >
            <p><b>Name:</b> {contact.name}</p>
            <p><b>Email:</b> {contact.email || "N/A"}</p>
            <p><b>Subject:</b> {contact.subject || "No subject"}</p>
            <p><b>Sent:</b>{" "}
              {contact.createdAt?.toDate
                ? contact.createdAt.toDate().toLocaleString()
                : "Unknown"}
            </p>
            <Link
              to={`/contact/${contact.id}`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
