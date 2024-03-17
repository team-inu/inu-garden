'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type OverviewProps = {
  data: {
    score: number;
    frequency: number;
  }[];
};

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const bar = data
    .map((e) => {
      return {
        score: e.score,
        total: e.frequency,
      };
    })
    .sort((a, b) => a.score - b.score);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={bar}>
        <XAxis
          dataKey="score"
          scale="band"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <XAxis dataKey="score" hide />
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
};

export default Overview;
