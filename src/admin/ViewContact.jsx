import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, Link } from "react-router-dom";

export default function ViewContact() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contactMessages", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert("Contact message not found");
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Message Details</h1>
      <p><b>Name:</b> {contact.name}</p>
      <p><b>Email:</b> {contact.email || "N/A"}</p>
      <p><b>Phone:</b> {contact.phone || "N/A"}</p>
      <p><b>Subject:</b> {contact.subject || "No subject"}</p>
      <p><b>Message:</b> {contact.message}</p>
      <p><b>Sent At:</b>{" "}
        {contact.createdAt?.toDate
          ? contact.createdAt.toDate().toLocaleString()
          : "Unknown"}
      </p>

      <Link
        to="/contacts"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        Back to All Contacts
      </Link>
    </div>
  );
}
