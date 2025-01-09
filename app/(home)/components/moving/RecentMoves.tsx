'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Move = {
  id: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  customer: {
    name: string;
    avatar: string;
  };
  details: string;
  timestamp: string;
};

const moves: Move[] = [
  {
    id: '1',
    status: 'in-progress',
    customer: {
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John Smith',
    },
    details: 'Moving from London to Manchester',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    status: 'scheduled',
    customer: {
      name: 'Sarah Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah Wilson',
    },
    details: 'Moving within Birmingham',
    timestamp: '3 hours ago',
  },
  {
    id: '3',
    status: 'completed',
    customer: {
      name: 'Mike Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike Brown',
    },
    details: 'Moved from Leeds to York',
    timestamp: '5 hours ago',
  },
  {
    id: '4',
    status: 'cancelled',
    customer: {
      name: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma Davis',
    },
    details: 'Cancelled move to Liverpool',
    timestamp: '1 day ago',
  },
];

export function RecentMoves() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Moves</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {moves.map((move) => (
            <div key={move.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={move.customer.avatar} alt="Avatar" />
                <AvatarFallback>{move.customer.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{move.customer.name}</p>
                <p className="text-sm text-muted-foreground">{move.details}</p>
              </div>
              <div className="ml-auto font-medium">
                <Badge
                  variant={
                    move.status === 'completed'
                      ? 'default'
                      : move.status === 'in-progress'
                      ? 'secondary'
                      : move.status === 'scheduled'
                      ? 'outline'
                      : 'destructive'
                  }
                >
                  {move.status.charAt(0).toUpperCase() + move.status.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{move.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
