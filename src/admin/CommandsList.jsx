import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function CommandsList() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      const querySnapshot = await getDocs(collection(db, "commands"));
      setCommands(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCommands();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Commands</h1>
      {commands.length === 0 && <p>No commands found.</p>}
      {commands.map((cmd) => (
        <div key={cmd.id} className="border p-3 my-2 flex justify-between items-center">
          <div>
            <p><b>{cmd.productName}</b> by {cmd.customerName}</p>
            <p>Quantity: {cmd.quantity} | Total: ${cmd.total?.toFixed(2)}</p>
          </div>
          <Link
            to={`/command/${cmd.id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
