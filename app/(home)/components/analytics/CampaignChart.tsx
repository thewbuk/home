'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

const chartData = [
  {
    month: 'Jan',
    active: 65,
    completed: 45,
  },
  {
    month: 'Feb',
    active: 75,
    completed: 55,
  },
  {
    month: 'Mar',
    active: 85,
    completed: 60,
  },
  {
    month: 'Apr',
    active: 95,
    completed: 70,
  },
  {
    month: 'May',
    active: 105,
    completed: 80,
  },
  {
    month: 'Jun',
    active: 115,
    completed: 90,
  },
];

const chartConfig = {
  active: {
    label: 'Active',
    color: 'hsl(var(--chart-1))',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

type CampaignChartProps = {
  className?: string;
};

export function CampaignChart({ className }: CampaignChartProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>Active vs Completed</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="active"
                fill={chartConfig.active.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="completed"
                fill={chartConfig.completed.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Completion rate increased by 15% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Monthly comparison of active and completed campaigns
        </div>
      </CardFooter>
    </Card>
  );
}
