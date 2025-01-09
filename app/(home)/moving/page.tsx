'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MovingServiceCard } from '../components/moving/MovingServiceCard';
import { CheckCircle, Truck, Box, Home, Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MovingAnalytics } from '../components/moving/MovingAnalytics';
import { RecentMoves } from '../components/moving/RecentMoves';

const movingServices = [
  {
    title: 'Professional Moving',
    description: 'Full-service moving with experienced professionals',
    features: [
      'Professional movers',
      'Loading and unloading',
      'Transportation',
      'Basic insurance coverage',
    ],
    price: 'From £299',
    badge: 'Most Popular',
    icon: <Truck className="h-4 w-4" />,
  },
  {
    title: 'Packing Service',
    description: 'Let our experts pack your belongings safely',
    features: [
      'Professional packing materials',
      'Careful handling',
      'Unpacking service',
      'Waste removal',
    ],
    price: 'From £199',
    icon: <Box className="h-4 w-4" />,
  },
  {
    title: 'Storage Solutions',
    description: 'Secure storage for your belongings',
    features: [
      '24/7 security',
      'Climate control',
      'Flexible duration',
      'Insurance included',
    ],
    price: 'From £49/month',
    icon: <Home className="h-4 w-4" />,
  },
];

const movingChecklist = [
  {
    title: '8 Weeks Before',
    tasks: [
      'Create a moving budget',
      'Research moving companies',
      'Start decluttering',
      'Begin packing non-essential items',
    ],
  },
  {
    title: '4 Weeks Before',
    tasks: [
      'Book moving service',
      'Notify utilities and services',
      'Change address',
      'Pack room by room',
    ],
  },
  {
    title: '1 Week Before',
    tasks: [
      'Pack essential items',
      'Confirm moving details',
      'Clean current home',
      'Prepare payment',
    ],
  },
  {
    title: 'Moving Day',
    tasks: [
      'Final walkthrough',
      'Meet moving team',
      'Supervise loading',
      'Hand over keys',
    ],
  },
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
  fromAddress: z.string().min(5, {
    message: "Please enter your current address.",
  }),
  toAddress: z.string().min(5, {
    message: "Please enter your destination address.",
  }),
  date: z.date({
    required_error: "Please select a moving date.",
  }),
  notes: z.string().optional(),
});

export default function MovingPage() {
  const [showBookDialog, setShowBookDialog] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      fromAddress: "",
      toAddress: "",
      date: new Date(),
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowBookDialog(false);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Moving Services</h2>
        <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
          <DialogTrigger asChild>
            <Button>Book a Move</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Your Move</DialogTitle>
              <DialogDescription>
                Fill out this form to book a consultation with our moving experts.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
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
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="123-456-7890" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fromAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Current St" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Address</FormLabel>
                      <FormControl>
                        <Input placeholder="456 New Home Ave" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Moving Date</FormLabel>
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
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
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
                          placeholder="Any special requirements or items that need special care?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Schedule Consultation</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <MovingAnalytics />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Our Services</CardTitle>
            <CardDescription>
              Professional and reliable moving services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {movingServices.map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col gap-2 p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-2">
                    {service.icon}
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="text-sm font-medium">{service.price}</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => setShowBookDialog(true)}
                  >
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Moving Checklist</CardTitle>
            <CardDescription>Essential tasks for your move</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movingChecklist.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="font-semibold text-sm">{section.title}</h3>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {section.tasks.map((task) => (
                      <li key={task} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RecentMoves />
    </div>
  );
}
