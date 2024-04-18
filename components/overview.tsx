'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type OverviewProps = {
  data: {
    score: number;
    frequency: number;
  }[];
};

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const shownData = [];
  for (let i = 0; i < 100; i++) {
    const found = data.find((e) => i === e.score);
    if (found) {
      shownData.push({
        score: i,
        total: found.frequency,
      });
      continue;
    }

    shownData.push({ score: i, total: 0 });
  }
  console.log(shownData); // const bar = data
  //   .map((e) => {
  //     return {
  //       score: e.score,
  //       total: e.frequency,
  //     };
  //   })
  //   .sort((a, b) => a.score - b.score);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={shownData}>
        <XAxis
          dataKey="score"
          scale="band"
          stroke="#888888"
          fontSize={5}
          tickLine={false}
          axisLine={false}
        />
        <XAxis dataKey="score" hide />
        <YAxis
          stroke="#888888"
          fontSize={5}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[0.5, 0.5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
