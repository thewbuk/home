import {
  Users,
  Video,
  Globe,
  MessageSquare,
  Star,
  Heart,
  Zap,
  Trophy,
} from 'lucide-react';
import { Feature, Achievement, Testimonial } from './types';

export const features: Feature[] = [
  {
    title: 'Watch Together',
    description: 'Synchronize video playback with friends in real-time',
    icon: Video,
    stats: { users: '5K+', sessions: '20K+' },
  },
  {
    title: 'Global Community',
    description: 'Connect with people from around the world',
    icon: Globe,
    stats: { countries: '150+', languages: '30+' },
  },
  {
    title: 'Live Chat',
    description: 'Chat with other viewers while watching',
    icon: MessageSquare,
    stats: { messages: '1M+', emojis: '500+' },
  },
  {
    title: 'Private Rooms',
    description: 'Create private rooms for you and your friends',
    icon: Users,
    stats: { rooms: '10K+', privacy: '100%' },
  },
];

export const achievements: Achievement[] = [
  { icon: Star, label: 'Watch Time', value: 100000, suffix: 'hrs' },
  { icon: Heart, label: 'Happy Users', value: 50000, suffix: '+' },
  { icon: Zap, label: 'Live Sessions', value: 75000, suffix: '+' },
  { icon: Trophy, label: 'Awards Won', value: 15, suffix: '' },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Alex Johnson',
    role: 'Content Creator',
    content:
      'Home has transformed how I watch YouTube with my community. The synchronization is perfect!',
    rating: 5,
    avatar: '👨‍💻',
    stats: { followers: '50K+', sessions: '200+' },
  },
  {
    name: 'Sarah Chen',
    role: 'Student',
    content:
      'I use Home for study groups. We watch educational content together and discuss in real-time.',
    rating: 5,
    avatar: '👩‍🎓',
    stats: { studyHours: '300+', groupSize: '25+' },
  },
  {
    name: 'Mike Brown',
    role: 'Gaming Enthusiast',
    content:
      'The best platform for watching gaming streams with friends. The chat feature is amazing!',
    rating: 5,
    avatar: '🎮',
    stats: { gamesWatched: '1000+', friends: '100+' },
  },
];
