import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

type MovingServiceProps = {
  title: string;
  description: string;
  features: string[];
  price: string;
  badge?: string;
  onBook?: () => void;
};

export function MovingServiceCard({
  title,
  description,
  features,
  price,
  badge,
  onBook,
}: MovingServiceProps) {
  return (
    <Card className="relative">
      {badge && (
        <Badge className="absolute top-4 right-4">
          {badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="text-2xl font-bold mb-4">{price}</div>
        <Button className="w-full" onClick={onBook}>
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
