import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getUserRole() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { role: null, id: null };

  const { data: admin } = await supabase
    .from('admins')
    .select('role, id')
    .eq('user_id', user.id)
    .single();
  if (admin) return { role: admin.role, id: admin.id };

  const { data: coordinator } = await supabase
    .from('coordinators')
    .select('id')
    .eq('user_id', user.id)
    .single();
  if (coordinator) return { role: 'coordinator', id: coordinator.id };

  const { data: driver } = await supabase
    .from('driver')
    .select('id')
    .eq('user_id', user.id)
    .single();
  if (driver) return { role: 'driver', id: driver.id };

  return { role: null, id: null };
}