'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  Truck,
  Lightbulb,
  Wifi,
  Shield,
  Tool,
  Search,
  Filter,
  Plus,
  BarChart2,
  Users,
  Layout,
  ListChecks,
  ClipboardCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { ServiceCard } from './components/services/ServiceCard';
import { HomeAnalyticsChart } from './components/analytics/HomeAnalyticsChart';

type Service = {
  id: number;
  name: string;
  category: string;
  status: 'available' | 'coming soon';
  description: string;
  icon?: any;
};

const homeServices = [
  {
    id: 1,
    name: 'Energy Services',
    category: 'Utilities',
    status: 'available',
    description: 'Find the perfect energy tariff for your home',
    icon: Lightbulb,
  },
  {
    id: 2,
    name: 'Broadband Setup',
    category: 'Connectivity',
    status: 'available',
    description: 'Get connected with the best broadband deals',
    icon: Wifi,
  },
  {
    id: 3,
    name: 'Moving Services',
    category: 'Services',
    status: 'available',
    description: 'Professional moving and storage solutions',
    icon: Truck,
  },
  {
    id: 4,
    name: 'Home Insurance',
    category: 'Insurance',
    status: 'available',
    description: 'Protect your home and belongings',
    icon: Shield,
  },
];

const HomeDashboard = () => {
  const [services, setServices] = React.useState<Service[]>(homeServices);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Home Dashboard</h1>
          <p className="text-muted-foreground">
            Transform the way you move and manage your home
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/services">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Services
            </Button>
          </Link>
          <Link href="/moving">
            <Button variant="outline">
              <Truck className="mr-2 h-4 w-4" />
              Moving
            </Button>
          </Link>
          <Link href="/utilities">
            <Button variant="outline">
              <Lightbulb className="mr-2 h-4 w-4" />
              Utilities
            </Button>
          </Link>
          <Link href="/insurance">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Insurance
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/moving">
          <Card className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moving Services</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Available services</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/utilities">
          <Card className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utility Services</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Available providers</p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Services
            </CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Currently managing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Money
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£127</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Services</CardTitle>
                <CardDescription>
                  Services to help manage your home
                </CardDescription>
              </div>
              <Link href="/services">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <service.icon className="w-10 h-10" />
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant={service.status === 'available' ? 'default' : 'secondary'}>
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest home management activities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <Lightbulb className="h-8 w-8" />
                      <div>
                        <h3 className="font-semibold">Energy Switch Completed</h3>
                        <p className="text-sm text-muted-foreground">
                          Switched to Green Energy Provider
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <Wifi className="h-8 w-8" />
                      <div>
                        <h3 className="font-semibold">Broadband Setup</h3>
                        <p className="text-sm text-muted-foreground">
                          Installation scheduled for next week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Overview</CardTitle>
              <CardDescription>
                Monthly savings across all services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HomeAnalyticsChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
