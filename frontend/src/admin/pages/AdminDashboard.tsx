import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import OrdersTable, { Order } from "../components/OrdersTable";

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders] = useState<Order[]>([
    { id: 1023, customer: "John Doe", amount: 250, status: "Completed", date: "2025-11-29" },
    { id: 1024, customer: "Sara Smith", amount: 120, status: "Pending", date: "2025-11-30" },
    { id: 1025, customer: "Ali Khan", amount: 540, status: "Completed", date: "2025-12-01" },
  ]);

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Desktop sidebar */}
      <div className="hidden md:block md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-6 shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 p-6">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatsCard title="Total Sales" value="$12,450" />
          <StatsCard title="Total Orders" value="540" />
          <StatsCard title="Active Users" value="320" />
        </div>

        {/* Orders + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrdersTable orders={orders} />

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Quick Actions</h3>

            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Add Product</button>
              <button className="px-4 py-2 border rounded-lg">Export Orders</button>
              <button className="px-4 py-2 border rounded-lg">Clear Cache</button>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-xs text-gray-400">
          © {new Date().getFullYear()} Parallax Shop
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
