'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HomeHero } from '@/components/HomeHero';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MouseFollower } from './MouseFollower';
import { FeatureCard } from './FeatureCard';
import { AchievementCard } from './AchievementCard';
import { TestimonialCard } from './TestimonialCard';
import { features, achievements, testimonials } from './data';
import HeroSection from '../hero';
import { SignUpForm } from './SignUpForm';

export function LandingPage() {
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

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <div ref={ref} className="relative flex flex-col gap-32 pb-20">
      <MouseFollower />
      {/* <HomeHero /> */}
      <SignUpForm />

      {/* Features Section */}
      <section className="relative mx-auto w-full max-w-7xl px-4 pt-2">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent" />
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className="mb-4 relative overflow-hidden group"
            >
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0  group-hover:translate-x-full duration-1000 transition-transform" />
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Why Choose Home?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of social video watching with our
              cutting-edge features
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {/* <section className="relative py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_100%)] opacity-20"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="relative mx-auto w-full max-w-7xl px-4"
          style={{ y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className="mb-4 relative overflow-hidden group"
            >
              <span className="relative z-10">Statistics</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 group-hover:translate-x-full duration-1000 transition-transform" />
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Our Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak for themselves
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.label}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="relative mx-auto w-full max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 relative overflow-hidden group">
            <span className="relative z-10">Testimonials</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 group-hover:translate-x-full duration-1000 transition-transform" />
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who love Home
          </p>
        </motion.div>
        <Tabs defaultValue="carousel" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-50" />
            <TabsTrigger value="carousel" className="relative z-10">
              Carousel View
            </TabsTrigger>
            <TabsTrigger value="grid" className="relative z-10">
              Grid View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="carousel">
            <Carousel className="w-full max-w-3xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hover:bg-primary/20 transition-colors" />
              <CarouselNext className="hover:bg-primary/20 transition-colors" />
            </Carousel>
          </TabsContent>
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section> */}

      {/* CTA Section */}
      <HeroSection />
    </div>
  );
}
