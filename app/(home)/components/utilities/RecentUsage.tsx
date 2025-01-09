'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Droplets, Flame } from 'lucide-react';

type Usage = {
  id: string;
  type: 'electricity' | 'water' | 'gas';
  reading: string;
  cost: string;
  change: 'increase' | 'decrease' | 'stable';
  timestamp: string;
};

const usageData: Usage[] = [
  {
    id: '1',
    type: 'electricity',
    reading: '245 kWh',
    cost: '£52.30',
    change: 'decrease',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'water',
    reading: '18.5 m³',
    cost: '£35.20',
    change: 'stable',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'gas',
    reading: '156 kWh',
    cost: '£45.80',
    change: 'decrease',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'electricity',
    reading: '280 kWh',
    cost: '£62.40',
    change: 'increase',
    timestamp: '2 days ago',
  },
];

export function RecentUsage() {
  const getIcon = (type: Usage['type']) => {
    switch (type) {
      case 'electricity':
        return <Zap className="h-4 w-4" />;
      case 'water':
        return <Droplets className="h-4 w-4" />;
      case 'gas':
        return <Flame className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {usageData.map((usage) => (
            <div key={usage.id} className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border">
                {getIcon(usage.type)}
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {usage.type.charAt(0).toUpperCase() + usage.type.slice(1)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {usage.reading} - {usage.cost}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <Badge
                  variant={
                    usage.change === 'decrease'
                      ? 'default'
                      : usage.change === 'stable'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {usage.change === 'decrease' ? '↓' : usage.change === 'increase' ? '↑' : '→'}
                  {' ' + usage.change.charAt(0).toUpperCase() + usage.change.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{usage.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
