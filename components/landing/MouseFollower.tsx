import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ x, y }}
    >
      <div className="relative -left-6 -top-6">
        <div className="absolute h-12 w-12 rounded-full bg-primary/30 blur-xl" />
        <div className="absolute h-4 w-4 rounded-full bg-primary" />
      </div>
    </motion.div>
  );
};
