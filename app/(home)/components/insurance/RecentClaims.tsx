'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Claim = {
  id: string;
  status: 'pending' | 'approved' | 'denied' | 'in-review';
  customer: {
    name: string;
    avatar: string;
  };
  type: string;
  amount: string;
  timestamp: string;
};

const claims: Claim[] = [
  {
    id: '1',
    status: 'approved',
    customer: {
      name: 'David Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David Wilson',
    },
    type: 'Home Insurance',
    amount: '£2,500',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    status: 'pending',
    customer: {
      name: 'Lucy Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy Brown',
    },
    type: 'Life Insurance',
    amount: '£50,000',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    status: 'in-review',
    customer: {
      name: 'James Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James Smith',
    },
    type: 'Health Insurance',
    amount: '£750',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    status: 'denied',
    customer: {
      name: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma Davis',
    },
    type: 'Home Insurance',
    amount: '£1,200',
    timestamp: '2 days ago',
  },
];

export function RecentClaims() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Claims</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {claims.map((claim) => (
            <div key={claim.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={claim.customer.avatar} alt="Avatar" />
                <AvatarFallback>{claim.customer.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{claim.customer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {claim.type} - {claim.amount}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <Badge
                  variant={
                    claim.status === 'approved'
                      ? 'default'
                      : claim.status === 'pending'
                      ? 'secondary'
                      : claim.status === 'in-review'
                      ? 'outline'
                      : 'destructive'
                  }
                >
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{claim.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
