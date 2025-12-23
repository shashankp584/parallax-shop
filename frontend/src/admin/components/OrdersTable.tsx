import React from "react";

export type Order = {
  id: number;
  customer: string;
  amount: number;
  status: string;
  date: string;
};

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Recent Orders</h3>
        <button className="text-sm text-indigo-600">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="py-3">#{o.id}</td>
                <td className="py-3">{o.customer}</td>
                <td className="py-3">${o.amount}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      o.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : o.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
