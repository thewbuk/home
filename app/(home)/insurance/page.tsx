'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '../components/services/ServiceCard';
import { Shield, Home, Briefcase, Car, Heart, Umbrella, Box } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InsuranceAnalytics } from '../components/insurance/InsuranceAnalytics';
import { RecentClaims } from '../components/insurance/RecentClaims';
import { cn } from '@/lib/utils';

interface InsuranceService {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  badge?: string;
  link: string;
  category: string;
  color?: string;
}

const insuranceServices: InsuranceService[] = [
  {
    title: 'Buildings Insurance',
    description: 'Protect your property structure and permanent fixtures',
    icon: <Home className="h-4 w-4" />,
    features: [
      'Building structure coverage',
      'Permanent fixtures protection',
      'Alternative accommodation',
      'Legal expenses cover',
    ],
    price: 'From £15/month',
    badge: 'Essential',
    link: '/insurance/buildings',
    category: 'home',
    color: 'bg-blue-100'
  },
  {
    title: 'Contents Insurance',
    description: 'Cover your household items and personal belongings',
    icon: <Box className="h-4 w-4" />,
    features: [
      'Personal belongings cover',
      'High-value items protection',
      'Accidental damage cover',
      'Away from home cover',
    ],
    price: 'From £10/month',
    link: '/insurance/contents',
    category: 'home',
    color: 'bg-green-100'
  },
  {
    title: 'Combined Insurance',
    description: 'Complete protection for your home and contents',
    icon: <Shield className="h-4 w-4" />,
    features: [
      'Buildings and contents cover',
      'Extended accidental damage',
      'Garden and outbuildings',
      'Home emergency cover',
    ],
    price: 'From £20/month',
    badge: 'Best Value',
    link: '/insurance/combined',
    category: 'home',
    color: 'bg-purple-100'
  },
  {
    title: 'Car Insurance',
    description: 'Comprehensive coverage for your vehicle',
    icon: <Car className="h-4 w-4" />,
    features: [
      'Comprehensive cover',
      'Third party protection',
      'Breakdown assistance',
      'Personal accident cover',
    ],
    price: 'From £30/month',
    link: '/insurance/car',
    category: 'auto',
    color: 'bg-red-100'
  },
  {
    title: 'Life Insurance',
    description: 'Financial security for your loved ones',
    icon: <Heart className="h-4 w-4" />,
    features: [
      'Death benefit coverage',
      'Critical illness option',
      'Terminal illness benefit',
      'Flexible premium payments',
    ],
    price: 'From £25/month',
    link: '/insurance/life',
    category: 'life',
    color: 'bg-pink-100'
  },
  {
    title: 'Umbrella Insurance',
    description: 'Additional liability protection across policies',
    icon: <Umbrella className="h-4 w-4" />,
    features: [
      'Extended liability coverage',
      'Cross-policy protection',
      'High coverage limits',
      'Legal defense costs',
    ],
    price: 'From £12/month',
    link: '/insurance/umbrella',
    category: 'life',
    color: 'bg-yellow-100'
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
  insuranceType: z.string(),
  message: z.string(),
});

export default function InsurancePage() {
  const [showQuoteDialog, setShowQuoteDialog] = React.useState(false);
  const [selectedInsurance, setSelectedInsurance] = React.useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowQuoteDialog(false);
  }

  const handleGetQuote = (type: string) => {
    setSelectedInsurance(type);
    form.setValue('insuranceType', type);
    setShowQuoteDialog(true);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Insurance Services</h2>
        <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
          <DialogTrigger asChild>
            <Button>Get a Quote</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Get Insurance Quote</DialogTitle>
              <DialogDescription>
                Fill in your details and we'll get back to you with a personalized quote
                {selectedInsurance && ` for ${selectedInsurance}`}.
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
                  name="insuranceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Type of insurance" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Input placeholder="Your message" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <InsuranceAnalytics />
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="life">Life & Health</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insuranceServices.map((service) => (
              <div
                key={service.title}
                className="flex flex-col p-4 rounded-lg border space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-2 rounded-lg",
                    service.color || "bg-primary/10"
                  )}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.price}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleGetQuote(service.title)}
                >
                  Get Quote
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="home" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insuranceServices
              .filter((service) => service.category === 'home')
              .map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col p-4 rounded-lg border space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded-lg",
                      service.color || "bg-primary/10"
                    )}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleGetQuote(service.title)}
                  >
                    Get Quote
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="life" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insuranceServices
              .filter((service) => service.category === 'life')
              .map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col p-4 rounded-lg border space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded-lg",
                      service.color || "bg-primary/10"
                    )}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleGetQuote(service.title)}
                  >
                    Get Quote
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <RecentClaims />
    </div>
  );
}
