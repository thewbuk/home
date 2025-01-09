'use client';

import { Youtube, Home, Book, Tv, Plus } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/common/icons';
import { supabase } from '@/lib/supabaseClient';
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();


  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xl:hidden"
          >
            <span className="sr-only">Toggle Menu</span>
            <Icons.mobile_button />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <MobileLink
            href="/"
            className="flex items-center p-4"
            onOpenChange={setOpen}
          >
            <Home className="mr-2 h-6 w-6" />
            <span className="font-bold">Home</span>
          </MobileLink>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn('flex items-center p-2', className)}
      {...props}
    >
      {children}
    </Link>
  );
}
