import { useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { StatisticItemProps, CountUpAnimationProps } from './types';
import { ParallaxCard } from './ParallaxCard';

const CountUpAnimation = ({ target, suffix = '' }: CountUpAnimationProps) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef);
  const count = useSpring(0, {
    duration: 2000,
    bounce: 0.25,
  });

  if (isInView) {
    count.set(target);
  }

  return (
    <span
      ref={nodeRef}
      className="tabular-nums bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
    >
      {Math.floor(count.get())}
      {suffix}
    </span>
  );
};

export const AchievementCard = ({ achievement, index }: StatisticItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <ParallaxCard>
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-background via-background/90 to-background/80 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_var(--primary)_0%,_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1 + index * 0.1,
              }}
              className="mb-4 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-primary/20 blur-sm" />
                <div className="relative rounded-full bg-primary/10 p-4 transition-transform duration-300 group-hover:scale-110">
                  <achievement.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </div>
            </motion.div>

            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="mb-2 text-center text-2xl font-bold tracking-tight"
            >
              <CountUpAnimation
                target={achievement.value}
                suffix={achievement.suffix}
              />
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center text-sm text-muted-foreground"
            >
              {achievement.label}
            </motion.p>

            <div className="mt-4 flex justify-center">
              <div className="h-1 w-1/2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.4 + index * 0.1,
                    ease: 'easeOut',
                  }}
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
