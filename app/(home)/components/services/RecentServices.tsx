'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type ServiceActivity = {
  id: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  user: {
    name: string;
    avatar: string;
  };
  service: string;
  price: string;
  timestamp: string;
};

const activities: ServiceActivity[] = [
  {
    id: '1',
    status: 'active',
    user: {
      name: 'Michael Scott',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael Scott',
    },
    service: 'Internet Package',
    price: '£35/month',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    status: 'pending',
    user: {
      name: 'Jim Halpert',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jim Halpert',
    },
    service: 'Home Security',
    price: '£25/month',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    status: 'completed',
    user: {
      name: 'Pam Beesly',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pam Beesly',
    },
    service: 'Smart Home Setup',
    price: '£150',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    status: 'cancelled',
    user: {
      name: 'Dwight Schrute',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dwight Schrute',
    },
    service: 'TV Package',
    price: '£45/month',
    timestamp: '2 days ago',
  },
];

export function RecentServices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Service Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt="Avatar" />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.service} - {activity.price}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <Badge
                  variant={
                    activity.status === 'completed'
                      ? 'default'
                      : activity.status === 'active'
                      ? 'secondary'
                      : activity.status === 'pending'
                      ? 'outline'
                      : 'destructive'
                  }
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
