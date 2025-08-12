import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";

export default function ViewCommand() {
  const { id } = useParams();
  const [command, setCommand] = useState(null);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const fetchCommandAndProduct = async () => {
      const commandRef = doc(db, "commands", id);
      const commandSnap = await getDoc(commandRef);

      if (!commandSnap.exists()) {
        alert("Command not found");
        return;
      }

      const commandData = commandSnap.data();
      setCommand(commandData);

      if (commandData.productId) {
        const productRef = doc(db, "products", commandData.productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProductImage(productData.imageUrl || null);
        }
      }
    };

    fetchCommandAndProduct();
  }, [id]);

  if (!command) return <p className="p-4">Loading...</p>;

  const createdAtDate = command.createdAt?.toDate ? command.createdAt.toDate() : null;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Command Details</h1>

      {productImage && (
        <img
          src={productImage}
          alt={command.productName}
          className="mb-4 max-w-full h-auto rounded"
        />
      )}

      <p><strong>Product Name:</strong> {command.productName}</p>
      <p><strong>Customer Name:</strong> {command.customerName}</p>
      <p><strong>Phone Number:</strong> {command.customerPhone}</p>
      <p><strong>Quantity:</strong> {command.quantity}</p>
      <p><strong>Price per item:</strong> ${command.price}</p>
      <p><strong>Total:</strong> ${command.total?.toFixed(2) ?? "N/A"}</p>
      <p><strong>Ordered At:</strong> {createdAtDate ? createdAtDate.toLocaleString() : "N/A"}</p>

      <Link
        to="/commands"
        className="mt-6 inline-block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
      >
        Back to Commands List
      </Link>
    </div>
  );
}
