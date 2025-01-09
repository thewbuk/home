'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Activity = {
  id: string;
  type: 'email' | 'campaign' | 'negotiation' | 'contract';
  creator: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
};

const activities: Activity[] = [
  {
    id: '1',
    type: 'email',
    creator: {
      name: 'Emma Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma Johnson',
    },
    action: 'Responded to onboarding email',
    timestamp: '5 minutes ago',
  },
  {
    id: '2',
    type: 'campaign',
    creator: {
      name: 'Alex Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex Rodriguez',
    },
    action: 'Started new campaign',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    type: 'negotiation',
    creator: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah Chen',
    },
    action: 'Updated contract terms',
    timestamp: '4 hours ago',
  },
  {
    id: '4',
    type: 'contract',
    creator: {
      name: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael Brown',
    },
    action: 'Signed partnership agreement',
    timestamp: '1 day ago',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={activity.creator.avatar}
                  alt={activity.creator.name}
                />
                <AvatarFallback>
                  {activity.creator.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.creator.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <Badge
                  variant={
                    activity.type === 'email'
                      ? 'default'
                      : activity.type === 'campaign'
                        ? 'secondary'
                        : activity.type === 'negotiation'
                          ? 'outline'
                          : 'destructive'
                  }
                >
                  {activity.type}
                </Badge>
                <span className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
