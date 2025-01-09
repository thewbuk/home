'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ServicesAnalytics } from '../components/services/ServicesAnalytics';
import { RecentServices } from '../components/services/RecentServices';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Star, Clock, Wrench, Paintbrush, Laptop, Scissors, Shirt } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  category: string;
  rating: number;
  duration: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Home Repair',
    description: 'Professional home repair and maintenance services',
    icon: <Wrench className="h-5 w-5" />,
    price: 'From £50/hour',
    category: 'home',
    rating: 4.8,
    duration: '1-2 hours'
  },
  {
    id: '2',
    title: 'House Painting',
    description: 'Interior and exterior painting services',
    icon: <Paintbrush className="h-5 w-5" />,
    price: 'From £200/room',
    category: 'home',
    rating: 4.9,
    duration: '4-8 hours'
  },
  {
    id: '3',
    title: 'Tech Support',
    description: 'Computer and device technical support',
    icon: <Laptop className="h-5 w-5" />,
    price: 'From £40/hour',
    category: 'tech',
    rating: 4.7,
    duration: '1-3 hours'
  },
  {
    id: '4',
    title: 'Haircut',
    description: 'Professional haircut and styling services',
    icon: <Scissors className="h-5 w-5" />,
    price: 'From £30',
    category: 'personal',
    rating: 4.9,
    duration: '30-60 min'
  },
  {
    id: '5',
    title: 'Dry Cleaning',
    description: 'Professional clothing care and cleaning',
    icon: <Shirt className="h-5 w-5" />,
    price: 'From £15',
    category: 'personal',
    rating: 4.8,
    duration: '24-48 hours'
  }
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServicesPage() {
  const [showBookDialog, setShowBookDialog] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log({ ...values, service: selectedService?.title });
    setShowBookDialog(false);
    form.reset();
  }

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setShowBookDialog(true);
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
      </div>

      <ServicesAnalytics />

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="tech">Tech</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle>{service.title}</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{service.rating}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{service.price}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <Button 
                  className="w-full" 
                  onClick={() => handleBookService(service)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>

      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              {selectedService ? `Book ${selectedService.title} - ${selectedService.price}` : 'Select a service to book'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requirements or instructions"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Book Service
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <RecentServices />
    </div>
  );
}
