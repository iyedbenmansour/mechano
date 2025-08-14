import React from "react";
import { Link } from "react-router-dom";
import { ListOrdered, ClipboardList, Calendar, Users } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path

export default function Admin() {
  useAdminAuth(); // checks token and redirects if needed

  const links = [
    { path: "/productslist", label: "Products List", icon: <ListOrdered size={28} /> },
    { path: "/commands", label: "Commands List", icon: <ClipboardList size={28} /> },
    { path: "/reservations", label: "Reservations List", icon: <Calendar size={28} /> },
    { path: "/contacts", label: "All Contacts", icon: <Users size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-700 hover:border-red-500"
            >
              <div className="mb-4 text-red-500">{link.icon}</div>
              <span className="text-lg font-semibold">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
