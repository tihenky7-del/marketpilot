"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Item = {
  label: string;
  total: number;
};

export default function SalesChart({
  data,
}: {
  data: Item[];
}) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar
            dataKey="total"
            radius={[8, 8, 0, 0]}
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}