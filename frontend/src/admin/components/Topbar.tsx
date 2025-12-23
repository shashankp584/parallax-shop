import React from "react";

type TopbarProps = {
  onToggleSidebar: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 bg-white px-3 py-2 rounded-lg shadow-sm">
          <input
            placeholder="Search orders, products..."
            className="outline-none text-sm"
          />
        </div>

        <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
