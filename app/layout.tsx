import { siteConfig } from '@/config/site';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { Footer } from '@/components/footer';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';

import '@/styles/globals.css';
import { SiteHeader } from '@/components/navbar/SiteHeader';
import { ClerkProvider } from '@clerk/nextjs';

const spaceGrotesk = SpaceGrotesk({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className} suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Analytics />
        <ClerkProvider
          appearance={{
            variables: { colorPrimary: '#000000' },
            elements: {
              formButtonPrimary:
                'bg-black border border-black border-solid hover:bg-white hover:text-black',
              socialButtonsBlockButton:
                'bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black',
              socialButtonsBlockButtonText: 'font-semibold',
              formButtonReset:
                'bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black',
              membersPageInviteButton:
                'bg-black border border-black border-solid hover:bg-white hover:text-black',
              card: 'bg-[#fafafa]',
            },
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            <SiteHeader />
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <Footer />
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
