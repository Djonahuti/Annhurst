'use client'
import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { Ban } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string | string[];
  address: string | string[];
  kyc: boolean;
  banned: boolean;
}

interface Coordinator {
  id: number;
  name: string;
  email: string;
  phone: string | string[];
  banned: boolean;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  banned: boolean;
}

export default function ViewUsers() {
  const { supabase } = useSupabase();
  const { user, role } = useAuth();
  const { adminRole } = useAuth();
  const router = useRouter();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [banLoading, setBanLoading] = useState<string | null>(null);

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    const { data: driverData } = await supabase.from("driver").select("id, name, email, phone, address, kyc, banned");
    const { data: coordinatorData } = await supabase.from("coordinators").select("id, name, email, phone, banned");
    const { data: adminData } = await supabase.from("admins").select("id, name, email, role, banned");
    setDrivers(driverData || []);
    setCoordinators(coordinatorData || []);
    setAdmins(adminData || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (!user || role !== "admin") {
      router.push("/login");
      return;
    }
    fetchAllUsers();
  }, [user, role, router, fetchAllUsers]);

  const handleBanToggle = async (table: string, id: string | number, banned: boolean) => {
    setBanLoading(`${table}-${id}`);
    await supabase.from(table).update({ banned: !banned }).eq("id", id);
    await fetchAllUsers();
    setBanLoading(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <Accordion type="multiple" defaultValue={["drivers", "coordinators", "admins"]}>
        <AccordionItem value="drivers">
          <AccordionTrigger className="text-2xl">Drivers</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Ban</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((d) => {
                  return (
                    <TableRow key={d.id} className="hover:bg-red-50 hover:text-primary">
                      <TableCell>{d.name}</TableCell>
                      <TableCell>{d.email}</TableCell>
                      <TableCell>{Array.isArray(d.phone) ? d.phone.join(", ") : d.phone}</TableCell>
                      <TableCell>{Array.isArray(d.address) ? d.address.join(", ") : d.address}</TableCell>
                      <TableCell>{d.kyc ? "Verified" : "Not Verified"}</TableCell>
                      <TableCell>
                       {adminRole !== "viewer" ? (
                        <button
                          className={`px-3 py-1 rounded ${d.banned ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                          disabled={banLoading === `driver-${d.id}`}
                          onClick={() => handleBanToggle('driver', d.id, d.banned)}
                        >
                          {banLoading === `driver-${d.id}` ? '...' : d.banned ? 'Unban' : 'Ban'}
                        </button>
                        ):(
                          <span className="text-gray-400 italic"><Ban /></span>
                        )} 
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="coordinators">
          <AccordionTrigger className="text-2xl">Coordinators</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Ban</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coordinators.map((c) => {
                  return (
                    <TableRow key={c.id} className="hover:bg-red-50 hover:text-primary">
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{Array.isArray(c.phone) ? c.phone.join(", ") : c.phone}</TableCell>
                      <TableCell>
                       {adminRole !== "viewer" ? (
                        <button
                          className={`px-3 py-1 rounded ${c.banned ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                          disabled={banLoading === `coordinators-${c.id}`}
                          onClick={() => handleBanToggle('coordinators', c.id, c.banned)}
                        >
                          {banLoading === `coordinators-${c.id}` ? '...' : c.banned ? 'Unban' : 'Ban'}
                        </button>
                        ):(
                          <span className="text-gray-400 italic"><Ban /></span>
                        )} 
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="admins">
          <AccordionTrigger className="text-2xl">Admins</AccordionTrigger>
          {adminRole !== "viewer" ? (
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Ban</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((a) => {
                  return (
                    <TableRow key={a.id} className="hover:bg-red-50 hover:text-primary">
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>{a.role}</TableCell>
                      <TableCell>
                        <button
                          className={`px-3 py-1 rounded ${a.banned ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                          disabled={banLoading === `admins-${a.id}`}
                          onClick={() => handleBanToggle('admins', a.id, a.banned)}
                        >
                          {banLoading === `admins-${a.id}` ? '...' : a.banned ? 'Unban' : 'Ban'}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </AccordionContent>
          ):(
            <span className="text-gray-400 italic">You only have Read Access, You can&apos;t View Admins</span>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
