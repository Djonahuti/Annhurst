import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { redirect } from 'next/navigation';
import { getUserRole } from '../auth/getUserRole';

export default async function DriverDashboard() {
  const { role, id } = await getUserRole();
  if (role !== 'driver') redirect('/auth/login');

  const supabase = await createSupabaseServerClient();
  const { data: buses } = await supabase
    .from('buses')
    .select('id, bus_code, plate_no, contract_date, initial_owe, deposited')
    .eq('driver', id);
  const { data: payments } = await supabase
    .from('payment')
    .select('id, amount, payment_date, pay_type, pay_complete')
    .eq('bus', buses?.[0]?.id);

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>My Buses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus Code</TableHead>
                <TableHead>Plate No</TableHead>
                <TableHead>Contract Date</TableHead>
                <TableHead>Initial Owe</TableHead>
                <TableHead>Deposited</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses?.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>{bus.bus_code}</TableCell>
                  <TableCell>{bus.plate_no}</TableCell>
                  <TableCell>{bus.contract_date}</TableCell>
                  <TableCell>{bus.initial_owe}</TableCell>
                  <TableCell>{bus.deposited}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.payment_date}</TableCell>
                  <TableCell>{payment.pay_type}</TableCell>
                  <TableCell>{payment.pay_complete ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}