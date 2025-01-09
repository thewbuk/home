'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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

const chartData = [
  { category: 'fashion', creators: 275, fill: 'var(--color-fashion)' },
  { category: 'tech', creators: 200, fill: 'var(--color-tech)' },
  { category: 'lifestyle', creators: 287, fill: 'var(--color-lifestyle)' },
  { category: 'gaming', creators: 173, fill: 'var(--color-gaming)' },
  { category: 'other', creators: 190, fill: 'var(--color-other)' },
];

const chartConfig = {
  creators: {
    label: 'Creators',
  },
  fashion: {
    label: 'Fashion',
    color: 'hsl(var(--chart-1))',
  },
  tech: {
    label: 'Tech',
    color: 'hsl(var(--chart-2))',
  },
  lifestyle: {
    label: 'Lifestyle',
    color: 'hsl(var(--chart-3))',
  },
  gaming: {
    label: 'Gaming',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function CreatorChart() {
  const totalCreators = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.creators, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Creator Distribution</CardTitle>
        <CardDescription>By Category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="creators"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCreators.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Creators
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Growth of 12.5% in Fashion category <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Distribution of creators across different categories
        </div>
      </CardFooter>
    </Card>
  );
}
