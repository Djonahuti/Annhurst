'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define a type for your bus data to fix the useState error
type Bus = {
  id: string;
  bus_code: string;
  plate_no: string;
  driver: {
    name: string;
  }[];
};

type DriverRow = {
  name: string | null;
};

type BusQueryRow = {
  id: string | number;
  bus_code: string | number;
  plate_no: string | number;
  driver: DriverRow[] | null;
};

const paymentSchema = z.object({
  bus: z.string(),
  amount: z.number().min(1),
  payment_date: z.string(),
  pay_type: z.string(),
  pay_complete: z.boolean(),
});

export default function CoordinatorDashboard() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { bus: '', amount: 0, payment_date: '', pay_type: '', pay_complete: false },
  });

  useEffect(() => {
    const fetchBuses = async () => {
      // Correctly await the user data
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('buses')
          .select('id, bus_code, plate_no, driver(name)')
          .eq('coordinator', user.id);

        if (error) {
          console.error("Error fetching buses:", error);
        } else {
          const normalized: Bus[] = (data ?? []).map((item: BusQueryRow) => ({
            id: String(item.id),
            bus_code: String(item.bus_code),
            plate_no: String(item.plate_no),
            driver: Array.isArray(item.driver)
              ? item.driver.map((d: DriverRow) => ({ name: String(d?.name ?? '') }))
              : [],
          }));
          setBuses(normalized);
        }
      }
    };

    fetchBuses();
  }, []);

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    await supabase.from('payment').insert({
      bus: data.bus,
      amount: data.amount,
      payment_date: data.payment_date,
      pay_type: data.pay_type,
      pay_complete: data.pay_complete,
    });
    form.reset();
  };

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Assigned Buses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus Code</TableHead>
                <TableHead>Plate No</TableHead>
                <TableHead>Driver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>{bus.bus_code}</TableCell>
                  <TableCell>{bus.plate_no}</TableCell>
                  <TableCell>{bus.driver?.[0]?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="bus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Add Payment</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}