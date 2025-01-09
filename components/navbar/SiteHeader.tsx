'use client';
import { MobileNav } from '@/components/navbar/MobileNav';
import { ThemeToggle } from '@/components/theme-toggle';
import { MainNav } from './MainNav';


type Category = {
  id: number;
  name: string;
  description: string;
};

type Notification = {
  id: number;
  user_id: string;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

export function SiteHeader() {




  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav  />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {/* <CommandSearch /> */}
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
            {/* <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
