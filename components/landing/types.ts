import { LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: Record<string, string>;
}

export interface Achievement {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  stats: Record<string, string>;
}

export interface CountUpAnimationProps {
  target: number;
  suffix?: string;
}

export interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export interface StatisticItemProps {
  achievement: Achievement;
  index: number;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}
