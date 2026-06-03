import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ExpenseBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis type="number" />

        <YAxis
          type="category"
          dataKey="name"
          width={100}
        />

        <Tooltip />

        <Bar
          dataKey="value"
          radius={[0, 10, 10, 0]}
          fill="maroon"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ExpenseBarChart;