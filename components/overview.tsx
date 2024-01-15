"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "0",
    total: 5,
  },
  {
    name: "10",
    total: 10,
  },
  {
    name: "20",
    total: 6,
  },
  {
    name: "30",
    total: 7,
  },
  {
    name: "40",
    total: 4,
  },
  {
    name: "50",
    total: 5,
  },
  {
    name: "60",
    total: 5,
  },
  {
    name: "70",
    total: 6,
  },
  {
    name: "80",
    total: 11,
  },
  {
    name: "90",
    total: 4,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          scale="band"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <XAxis dataKey="name" hide/>
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
