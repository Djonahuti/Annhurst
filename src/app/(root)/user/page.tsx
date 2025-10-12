'use client'

import EventCalendar from "@/components/EventCalender";
import Modal from "@/components/Modal";
import Contact from "@/components/Shared/Contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/contexts/SupabaseContext";
import { LocateFixed, Mail, RadioTower, SendHorizontal } from "lucide-react";
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
  driver_id: number | null;
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

          // Normalize driver id if present (could be string or number)
          const driverId = driverObj && driverObj.id !== undefined
            ? (typeof driverObj.id === 'string' ? parseInt(String(driverObj.id), 10) : Number(driverObj.id))
            : null;

          return {
            id: typeof bus.id === 'string' ? parseInt(bus.id, 10) : bus.id,
            bus_code: bus.bus_code ?? null,
            plate_no: bus.plate_no ?? null,
            driver_name: driverName,
            driver_id: driverId,
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
        <CardContent className="flex justify-between">
          <div className="mr-auto">
          <p>Role: Coordinator</p>
          <p>Email: {coordinator?.email}</p>
          {coordinator?.phone && <p>Phone: {coordinator.phone.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="border-2 flex-1 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary-dark dark:hover:bg-primary-light hover:text-gray-200 dark:hover:text-gray-100">
                  <LocateFixed className="mr-2 h-4 w-4" />
                  Tracker
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link
                   href="https://www.google.com/url?q=https%3A%2F%2Fmonitor.concept-nova.com%2Fobjects&sa=D&sntz=1&usg=AOvVaw01M4s_3W-IWNHk1xNNnUbO"
                   target="_blank"
                   rel="noopener noreferrer"
                  >
                    Tracker
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                   href="https://www.google.com/url?q=https%3A%2F%2Fmonitor.autotrack.ng%2Fobjects&sa=D&sntz=1&usg=AOvVaw13LwsAMr7YvUbnjCnMaJSS"
                   target="_blank"
                   rel="noopener noreferrer"
                  >
                    New Tracker
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </p>

            <p>
              <Link
               href="https://sites.google.com/annhurst-gsl.com/portal/home"
               target="_blank"
               rel="noopener noreferrer"
              >
                <Button size='sm' className='bg-primary text-gray-200 hover:bg-red-50 hover:text-primary'>
                  <RadioTower />Intranet
                </Button>
              </Link>
            </p>
          </div>
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
                    <TableCell className="space-x-2">
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
                         // Use the driver_id (if available) so we target the correct driver record
                         setSelectedDriverId(bus.driver_name !== 'N/A' ? bus.driver_id : null);
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

        <CardFooter className="flex justify-between">
          <div className="text-2xl">Next End of the Month Meeting Date</div>
          <EventCalendar />
        </CardFooter>
      </Card>
      {/* Contact Modal */}
      <Modal isOpen2={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <Contact driverId={selectedDriverId} />
      </Modal>    
    </div>
  )

}
