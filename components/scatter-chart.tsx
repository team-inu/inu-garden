"use client";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const data01 = [
  {
    x: 100,
    y: 200,
    z: 200,
  },
  {
    x: 120,
    y: 100,
    z: 260,
  },
  {
    x: 170,
    y: 300,
    z: 400,
  },
  {
    x: 140,
    y: 250,
    z: 280,
  },
  {
    x: 150,
    y: 400,
    z: 500,
  },
  {
    x: 110,
    y: 280,
    z: 200,
  },
];
const ScatterChartCustom = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart width={730} height={250}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" name="stature" unit="cm" />
        <YAxis dataKey="y" type="number" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="A school" data={data01} fill="#adfa1d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartCustom;
