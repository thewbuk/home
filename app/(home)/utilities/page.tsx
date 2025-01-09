'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '../components/services/ServiceCard';
import { Lightbulb, Wifi, Tv, Droplets, Leaf, Zap, ChevronRight, Flame, Droplet } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { UtilitiesAnalytics } from '../components/utilities/UtilitiesAnalytics';
import { RecentUsage } from '../components/utilities/RecentUsage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

interface UtilityService {
  title: string;
  icon: React.ReactNode;
  description?: string;
  features?: string[];
  price?: string;
  badge?: string;
  link?: string;
}

const utilityServices: UtilityService[] = [
  {
    title: 'Energy',
    icon: <Lightbulb className="h-4 w-4" />,
    description: 'Find the best energy deals and switch providers easily',
    features: [
      'Compare energy providers',
      'Smart meter installation',
      'Energy efficiency advice',
      'Green energy options',
    ],
    price: 'From £0/month',
    badge: 'Popular',
    link: '/utilities/energy',
  },
  {
    title: 'Broadband',
    icon: <Wifi className="h-4 w-4" />,
    description: 'High-speed internet for your home',
    features: [
      'Compare broadband deals',
      'Speed guarantee',
      'Professional installation',
      'Router included',
    ],
    price: 'From £20/month',
    link: '/utilities/broadband',
  },
  {
    title: 'TV & Entertainment',
    icon: <Tv className="h-4 w-4" />,
    description: 'Stream your favorite content',
    features: [
      'TV packages',
      'Streaming services',
      'Sports channels',
      'Movie bundles',
    ],
    price: 'From £10/month',
    link: '/utilities/tv',
  },
  {
    title: 'Water',
    icon: <Droplets className="h-4 w-4" />,
    description: 'Manage your water supply and bills',
    features: [
      'Water efficiency tips',
      'Leak detection',
      'Bill management',
      'Usage monitoring',
    ],
    price: 'Variable',
    link: '/utilities/water',
  },
  {
    title: 'Green Energy',
    icon: <Leaf className="h-4 w-4" />,
    description: 'Sustainable energy solutions',
    features: [
      'Solar panels',
      'Heat pumps',
      'Battery storage',
      'EV charging',
    ],
    price: 'Custom quote',
    badge: 'Eco-friendly',
    link: '/utilities/green',
  },
  {
    title: 'Smart Home',
    icon: <Zap className="h-4 w-4" />,
    description: 'Automate and control your utilities',
    features: [
      'Smart thermostats',
      'Energy monitoring',
      'Automation',
      'Remote control',
    ],
    price: 'From £15/month',
    link: '/utilities/smart',
  },
];

const usageData = [
  { month: 'Jan', electricity: 250, gas: 300, water: 120 },
  { month: 'Feb', electricity: 280, gas: 320, water: 115 },
  { month: 'Mar', electricity: 260, gas: 280, water: 118 },
  { month: 'Apr', electricity: 240, gas: 220, water: 122 },
  { month: 'May', electricity: 220, gas: 180, water: 125 },
  { month: 'Jun', electricity: 200, gas: 150, water: 130 },
];

const tips = [
  {
    title: 'Energy Saving Tips',
    items: [
      'Switch to LED bulbs to save up to 75% on lighting costs',
      'Use a programmable thermostat to optimize heating/cooling',
      'Seal windows and doors to prevent heat loss',
      'Unplug devices when not in use to avoid phantom energy usage',
    ],
  },
  {
    title: 'Water Conservation',
    items: [
      'Fix leaky faucets promptly',
      'Install water-efficient showerheads',
      'Collect rainwater for garden use',
      'Run full loads in dishwasher and washing machine',
    ],
  },
  {
    title: 'Internet Optimization',
    items: [
      'Place router in central location',
      'Use mesh networks for better coverage',
      'Regularly update router firmware',
      'Consider wired connections for gaming/streaming',
    ],
  },
];

const chartConfig = {
  electricity: {
    label: 'Electricity (kWh)',
    color: 'rgb(59, 130, 246)',
  },
  gas: {
    label: 'Gas (kWh)',
    color: 'rgb(239, 68, 68)',
  },
  water: {
    label: 'Water (m³)',
    color: 'rgb(16, 185, 129)',
  },
};

export default function UtilitiesPage() {
  const [showConnectDialog, setShowConnectDialog] = React.useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Utilities</h2>
        <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
          <DialogTrigger asChild>
            <Button>Connect New Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New Service</DialogTitle>
              <DialogDescription>
                Choose a utility service to connect to your home.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {utilityServices.map((service) => (
                <Button
                  key={service.title}
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 h-24"
                  onClick={() => setShowConnectDialog(false)}
                >
                  {service.icon}
                  <span>{service.title}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <UtilitiesAnalytics />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Current month's consumption</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Electricity</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Gas</span>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Water</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Connected Services</CardTitle>
            <CardDescription>Your active utility connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {utilityServices.map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border"
                >
                  {service.icon}
                  <span className="text-sm font-medium">{service.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentUsage />
        <Card>
          <CardHeader>
            <CardTitle>Usage History</CardTitle>
            <CardDescription>Last 6 months consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px] w-full" config={chartConfig}>
              <LineChart data={usageData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} className='w-full'>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="electricity"
                  stroke={chartConfig.electricity.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="gas"
                  stroke={chartConfig.gas.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="water"
                  stroke={chartConfig.water.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
