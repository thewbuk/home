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
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
  price?: string;
  badge?: string;
  link: string;
};

export function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
  price,
  badge,
  link,
}: ServiceCardProps) {
  return (
    <Card className="relative">
      {badge && (
        <Badge className="absolute top-4 right-4" variant="secondary">
          {badge}
        </Badge>
      )}
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {features && (
          <ul className="space-y-2 mb-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {price && <div className="text-2xl font-bold mb-4">{price}</div>}
        <Button asChild className="w-full">
          <Link href={link}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
