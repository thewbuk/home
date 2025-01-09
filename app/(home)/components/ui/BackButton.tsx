'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.push('/')}
      className="mb-4"
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
}
