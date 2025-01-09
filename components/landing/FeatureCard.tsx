import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ParallaxCard } from './ParallaxCard';
import { FeatureCardProps } from './types';

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <ParallaxCard className="h-full">
        <div className="group relative h-full overflow-hidden rounded-xl bg-gradient-to-b from-background via-background/90 to-background/80 p-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/0 to-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_var(--primary)_0%,_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1 + index * 0.1,
                }}
                className="relative"
              >
                <div className="absolute -inset-1 animate-pulse rounded-full bg-primary/20 blur-sm" />
                <div className="relative rounded-full bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex gap-2"
              >
                {Object.entries(feature.stats).map(([key, value], i) => (
                  <div
                    key={key}
                    className="relative overflow-hidden rounded-full bg-muted px-3 py-1 text-xs"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative">{value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="mb-2 text-xl font-semibold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              {feature.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-sm text-muted-foreground"
            >
              {feature.description}
            </motion.p>

            <div className="mt-6 flex items-center justify-between">
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-1 -left-1 -right-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute -left-1 -right-1 -top-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </ParallaxCard>
    </motion.div>
  );
};
