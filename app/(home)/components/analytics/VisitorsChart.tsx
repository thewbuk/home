'use client';

import * as React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data = [
  {
    name: 'Jan',
    savings: 2400,
    users: 400,
  },
  {
    name: 'Feb',
    savings: 1398,
    users: 300,
  },
  {
    name: 'Mar',
    savings: 9800,
    users: 600,
  },
  {
    name: 'Apr',
    savings: 3908,
    users: 700,
  },
  {
    name: 'May',
    savings: 4800,
    users: 800,
  },
  {
    name: 'Jun',
    savings: 3800,
    users: 900,
  },
  {
    name: 'Jul',
    savings: 4300,
    users: 1100,
  },
];

export function HomeAnalyticsChart() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Home.cc Analytics</CardTitle>
          <CardDescription>
            Total Savings and Active Users
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
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
              tickFormatter={(value) => `£${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#8884d8"
              strokeWidth={2}
              name="Total Savings"
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Active Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
