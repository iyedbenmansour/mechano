import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ArrowLeft, User, Package, DollarSign, Phone, Calendar } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


export default function ViewCommand() {
    useAdminAuth(); // checks token and redirects if needed

  const { id } = useParams();
  const navigate = useNavigate();
  const [command, setCommand] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommandAndProduct = async () => {
      setLoading(true);
      try {
        const commandRef = doc(db, "commands", id);
        const commandSnap = await getDoc(commandRef);

        if (!commandSnap.exists()) {
          alert("Command not found");
          navigate("/commands");
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
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load command details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommandAndProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!command) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Command not found.</p>
        <button
          onClick={() => navigate("/commands")}
          className="flex items-center gap-2 bg-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          <ArrowLeft size={20} /> Back to Commands
        </button>
      </div>
    );
  }

  const createdAtDate = command.createdAt?.toDate ? command.createdAt.toDate() : null;

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
          Order Details
        </h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="flex flex-col items-center">
          {productImage ? (
            <img
              src={productImage}
              alt={command.productName}
              className="w-full max-h-80 object-contain rounded-xl border border-gray-700 shadow-lg"
            />
          ) : (
            <div className="w-full max-h-80 flex items-center justify-center bg-gray-700 rounded-xl text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            {command.productName}
          </h2>

          <DetailItem
            icon={<User />}
            label="Customer Name"
            value={command.customerName}
          />
          <DetailItem
            icon={<Phone />}
            label="Phone Number"
            value={command.customerPhone}
          />
          <DetailItem
            icon={<Package />}
            label="Quantity"
            value={command.quantity}
          />
          <DetailItem
            icon={<DollarSign />}
            label="Price per Item"
            value={`$${command.price?.toFixed(2) ?? "N/A"}`}
          />
          <DetailItem
            icon={<DollarSign />}
            label="Total Price"
            value={`$${command.total?.toFixed(2) ?? "N/A"}`}
          />
          <DetailItem
            icon={<Calendar />}
            label="Ordered At"
            value={createdAtDate ? createdAtDate.toLocaleString() : "N/A"}
          />
        </div>
      </div>
    </div>
  );
}