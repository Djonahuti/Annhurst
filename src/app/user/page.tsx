'use client'

import Modal from "@/components/Modal";
import Contact from "@/components/Shared/Contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/contexts/SupabaseContext";
import { Mail, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Type for raw bus data from Supabase
interface BusRaw {
  id: number | string;
  bus_code: string | null;
  plate_no: string | null;
  driver: { id?: number; name?: string } | { id?: number; name?: string }[] | null;
}

interface Bus {
  id: number;
  bus_code: string | null;
  plate_no: string | null;
  driver_name: string | null;
}

interface Coordinator {
  id: number;
  name: string;
  email: string;
  phone: string[] | null;
}

export default function UserProfile() {
  const router = useRouter();
  const { user, role, loading: authLoading, signOut } = useAuth()
  const { supabase } = useSupabase()

  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)
  const [coordinator, setCoordinator] = useState<Coordinator | null>(null)
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCoordinatorAndBuses = async () => {
      if (!authLoading && (!user || role !== 'coordinator')) {
        router.push('/login')
        return
      }

      if (authLoading) {
        return // Wait for auth to finish loading
      }

      // Find coordinator record by email
      const { data: coData, error: coError } = await supabase
        .from('coordinators')
        .select('*')
        .eq('email', user?.email ?? '')
        .single()

      if (coError || !coData) {
        console.error('Coordinator not found:', coError)
        router.push('/login')
        return
      }
      setCoordinator(coData)

      // Fetch buses related to this coordinator
      const { data: busesData, error: busError } = await supabase
        .from('buses')
        .select(`
          id,
          bus_code,
          plate_no,
          driver:driver(id, name)
        `)
        .eq('coordinator', coData.id)

      if (busError) {
        console.error('Error fetching buses:', busError)
        setBuses([])
      } else {
        // Use BusRaw type for mapping, output Bus[]
        const formattedBuses: Bus[] = (busesData as BusRaw[]).map((bus) => {
          let driverObj: { id?: number; name?: string } | null = null;
          if (Array.isArray(bus.driver)) {
            driverObj = bus.driver.length > 0 ? bus.driver[0] : null;
          } else if (bus.driver && typeof bus.driver === 'object') {
            driverObj = bus.driver;
          }

          const driverName = driverObj && typeof driverObj.name === 'string' && driverObj.name.length > 0
            ? driverObj.name
            : 'N/A';

          return {
            id: typeof bus.id === 'string' ? parseInt(bus.id, 10) : bus.id,
            bus_code: bus.bus_code ?? null,
            plate_no: bus.plate_no ?? null,
            driver_name: driverName,
          };
        });
        setBuses(formattedBuses);
      }

      setLoading(false)
    }

    fetchCoordinatorAndBuses()
  }, [user, role, authLoading, supabase])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Coordinator Profile</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            Welcome, {coordinator?.name || user?.email}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Role: Coordinator</p>
          <p>Email: {coordinator?.email}</p>
          {coordinator?.phone && <p>Phone: {coordinator.phone.join(', ')}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/my-inbox" className="mr-auto">
            <Button className="bg-gradient-to-r from-gray-600 to-primary-light text-gray-200 hover:from-primary-dark hover:to-primary-dark transform transition duration-300 ease-in-out hover:scale-105">
              <Mail />Inbox
            </Button>
          </Link>
          <Button onClick={handleLogout} className='text-gray-200'>
            Logout
          </Button>
        </CardFooter>        
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buses Under Your Coordination</CardTitle>
        </CardHeader>
        <CardContent>
          {buses.length === 0 ? (
            <p>No buses assigned to you.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Code</TableHead>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buses.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell>{bus.bus_code || 'N/A'}</TableCell>
                    <TableCell>{bus.plate_no || 'N/A'}</TableCell>
                    <TableCell>{bus.driver_name || 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/payment/${bus.id}`)}
                      >
                        Post Payment
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/payment/${bus.id}/history`)}
                      >
                        View Payments
                      </Button>
                      <Button
                       className='mt-2 ml-auto block text-gray-200'
                       onClick={() => {
                         setSelectedDriverId(bus.driver_name !== 'N/A' ? bus.id : null);
                         setContactModalOpen(true);
                       }}
                      >
                       <SendHorizontal />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <Contact driverId={selectedDriverId} />
      </Modal>    
    </div>
  )

}
