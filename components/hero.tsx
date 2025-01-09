'use client';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import * as React from 'react';
import Marquee from '@/components/ui/marquee';
import { supabase } from '@/lib/supabaseClient';
import {
  Card as UICard,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface Room {
  id: string;
  room_name: string;
  created_at: string;
  is_public: boolean;
  category: string;
  video_url: string;
}

function getYouTubeThumbnail(videoUrl: string): string | null {
  try {
    // Handle different YouTube URL formats
    const regexPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of regexPatterns) {
      const match = videoUrl.match(pattern);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/0.jpg`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.name.toLowerCase()}`}
      className="group relative flex max-w-xs cursor-pointer flex-col gap-2 overflow-hidden md:max-w-sm"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-background to-background/80 p-6 shadow-xl transition-all duration-300 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/0 to-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 flex items-center gap-4">
          {category.image_url && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                sizes="(max-width: 64px) 100vw, 64px"
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 -left-1 -right-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -left-1 -right-1 -top-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </Link>
  );
}

export function RoomCard({ room }: { room: Room }) {
  const thumbnailUrl = room.video_url
    ? getYouTubeThumbnail(room.video_url)
    : null;

  return (
    <Link
      href={`/room/${room.id}`}
      className="group relative flex max-w-xs cursor-pointer flex-col gap-2 overflow-hidden md:max-w-sm"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-background to-background/80 p-6 shadow-xl transition-all duration-300 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/0 to-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 flex items-center gap-4">
          {thumbnailUrl && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={thumbnailUrl}
                alt={room.room_name || 'Room thumbnail'}
                fill
                sizes="(max-width: 64px) 100vw, 64px"
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {room.room_name || 'Untitled Room'}
            </h3>
            <p className="text-sm text-muted-foreground">{room.category}</p>
          </div>
        </div>
        <div className="absolute -bottom-1 -left-1 -right-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -left-1 -right-1 -top-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const supabaseClient = supabase();

        // Fetch categories
        const { data: categoriesData, error: categoriesError } =
          await supabaseClient.from('categories').select('*').order('name');

        if (categoriesError) throw categoriesError;

        // Fetch public rooms
        const { data: roomsData, error: roomsError } = await supabaseClient
          .from('rooms')
          .select('*')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (roomsError) throw roomsError;

        setCategories(categoriesData || []);
        setRooms(roomsData || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="py-14 text-center text-red-500">
        <p>Failed to load data: {error}</p>
      </div>
    );
  }

  return (
    <section id="showcase" className="container py-14">
      <div className="relative flex flex-col">
        {loading && (
          <div className="flex items-center justify-center py-14">
            <Skeleton className="h-[140px] w-full" />
          </div>
        )}
        <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="max-w-screen mt-10 [--duration:40s]"
        >
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
