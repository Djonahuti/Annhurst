import { redirect } from 'next/navigation';
import { getUserRole } from '../auth/getUserRole';

export default async function Dashboard() {
  const { role } = await getUserRole();
  if (!role) redirect('/login');

  if (role === 'driver') redirect('/driver');
  if (role === 'coordinator') redirect('/coordinator');
  if (['admin', 'editor', 'viewer'].includes(role)) redirect('/admin');
  return null;
}