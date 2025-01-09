import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { ParallaxCard } from './ParallaxCard';
import { TestimonialCardProps } from './types';

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <ParallaxCard>
      <div className="group relative h-full overflow-hidden rounded-xl bg-gradient-to-b from-background via-background/90 to-background/80 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_var(--primary)_0%,_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

        <div className="relative z-10">
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative"
              >
                <div className="absolute -inset-1 animate-pulse rounded-full bg-primary/20 blur-sm" />
                <div className="relative rounded-full bg-primary/10 p-2 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {testimonial.avatar}
                </div>
              </motion.div>
              <div>
                <h4 className="font-semibold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-sm" />
                  <Star className="relative h-4 w-4 fill-primary text-primary" />
                </motion.div>
              ))}
            </div>
          </div>

          <blockquote className="relative mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -left-2 -top-2 text-4xl text-primary/20"
            >
              &quot;
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-2 text-4xl text-primary/20"
            >
              &quot;
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 text-lg italic text-muted-foreground"
            >
              {testimonial.content}
            </motion.p>
          </blockquote>

          <div className="mt-4 flex justify-end">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group/button relative overflow-hidden"
                >
                  <span className="relative z-10">View Stats</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-700" />
                  <span className="absolute -bottom-px left-0 h-px w-full bg-gradient-to-r from-primary/50 to-primary/50 scale-x-0 transition-transform group-hover/button:scale-x-100" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit">
                <div className="space-y-2">
                  {Object.entries(testimonial.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="text-sm capitalize text-muted-foreground">
                        {key}:
                      </span>
                      <span className="font-semibold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="absolute -bottom-1 -left-1 -right-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -left-1 -right-1 -top-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </ParallaxCard>
  );
};
