import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  children?: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {children && <div className="mt-3 text-xs text-gray-400">{children}</div>}
    </div>
  );
};

export default StatsCard;
