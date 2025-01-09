import * as React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {
    service: 'Energy',
    users: 892,
  },
  {
    service: 'Broadband',
    users: 654,
  },
  {
    service: 'Moving',
    users: 432,
  },
  {
    service: 'Insurance',
    users: 321,
  },
  {
    service: 'TV',
    users: 287,
  },
  {
    service: 'Maintenance',
    users: 156,
  },
];

export function ServiceUsageChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="service"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="users"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
