import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DollarSign, List } from "lucide-react";
import { useAdminAuth } from "./useAdminAuth"; // adjust path


// Import chart components and elements for a Line Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the chart components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CommandsList() {

    useAdminAuth(); // checks token and redirects if needed

  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommands = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "commands"));
        const fetchedCommands = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCommands(fetchedCommands);
      } catch (error) {
        console.error("Error fetching commands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommands();
  }, []);

  const totalCommands = commands.length;
  const totalRevenue = commands.reduce((sum, cmd) => sum + (cmd.total || 0), 0);

  // Data processing for the new combined line chart
  const dailyData = commands.reduce((acc, cmd) => {
    // Check if createdAt is a valid timestamp
    if (cmd.createdAt && typeof cmd.createdAt === 'object' && cmd.createdAt.seconds) {
      const date = new Date(cmd.createdAt.seconds * 1000);
      const dateKey = date.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = { revenue: 0, commandCount: 0 };
      }
      acc[dateKey].revenue += cmd.total || 0;
      acc[dateKey].commandCount += 1;
    }
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyData).sort();
  const dailyRevenues = sortedDates.map((date) => dailyData[date].revenue);
  const dailyCommandCounts = sortedDates.map((date) => dailyData[date].commandCount);

  const lineChartData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Total Revenue",
        data: dailyRevenues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y-revenue",
        tension: 0.4,
      },
      {
        label: "Number of Commands",
        data: dailyCommandCounts,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        yAxisID: "y-commands",
        tension: 0.4,
      },
    ],
  };

  // Chart options with two Y-axes
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e2e8f0", // Tailwind's gray-200
        },
      },
      title: {
        display: true,
        text: "Daily Revenue and Command Count",
        font: {
          size: 16,
        },
        color: "#e2e8f0",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.dataset.yAxisID === "y-revenue") {
              label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(context.parsed.y);
            } else {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      "y-revenue": {
        type: "linear",
        display: "auto",
        position: "left",
        title: {
          display: true,
          text: "Total Revenue ($)",
          color: "rgba(255, 99, 132, 1)",
        },
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
      "y-commands": {
        type: "linear",
        display: "auto",
        position: "right",
        title: {
          display: true,
          text: "Number of Commands",
          color: "rgba(54, 162, 235, 1)",
        },
        ticks: { color: "#9ca3af" },
        grid: { drawOnChartArea: false }, // Only draw grid lines for the left axis
      },
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
      </div>

      {/* Page Header */}
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
        Sales Overview
      </h1>

      {loading ? (
        <div className="text-center text-gray-400">Loading commands...</div>
      ) : (
        <>
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="p-3 bg-red-500 rounded-full">
                <List size={24} className="text-gray-900" />
              </div>
              <div>
                <p className="text-gray-400 uppercase text-sm">Total Commands</p>
                <p className="text-3xl font-bold">{totalCommands}</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="p-3 bg-yellow-500 rounded-full">
                <DollarSign size={24} className="text-gray-900" />
              </div>
              <div>
                <p className="text-gray-400 uppercase text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* New Line Chart Section */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Daily Sales Trends
            </h2>
            <div className="h-96">
              <Line options={chartOptions} data={lineChartData} />
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Recent Orders
            </h2>
            {commands.length === 0 ? (
              <p className="text-center text-gray-400">No commands found.</p>
            ) : (
              <div className="grid gap-4">
                {commands.map((cmd) => (
                  <div
                    key={cmd.id}
                    className="flex justify-between items-center p-4 border border-gray-700 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div>
                      <p className="font-semibold text-lg">
                        {cmd.productName}{" "}
                        <span className="text-gray-400">by {cmd.customerName}</span>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Quantity: {cmd.quantity} | Total: ${cmd.total?.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      to={`/command/${cmd.id}`}
                      className="bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}