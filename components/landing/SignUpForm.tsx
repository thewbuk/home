import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function SignUpForm() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send email');

      toast.success('Welcome email sent! Check your inbox.');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          Your Ultimate YouTube <br /> Experience
        </h1>
        <p className="mt-2 mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          Join thousands of users who have transformed their YouTube watching!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full max-w-xl px-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-background border-muted-foreground/20 flex-grow"
            required
          />
          <Button
            type="submit"
            className="h-12 px-6 text-base font-medium whitespace-nowrap"
            disabled={isLoading}
            variant="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
