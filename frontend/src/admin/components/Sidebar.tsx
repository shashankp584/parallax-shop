import React from "react";

type SidebarProps = {
  active?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ active = "dashboard" }) => {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" },
    { id: "users", label: "Users" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-indigo-600">Parallax Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your store</p>
      </div>

      <nav className="space-y-2">
        {items.map((it) => (
          <button
            key={it.id}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-indigo-50 transition ${
              active === it.id ? "bg-indigo-50 ring-1 ring-indigo-200" : ""
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-300" />
            <span className="font-medium text-gray-700">{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <div className="text-xs text-gray-400">Signed in as</div>
        <div className="mt-2 text-sm font-medium">admin@parallax.com</div>
      </div>
    </aside>
  );
};

export default Sidebar;
