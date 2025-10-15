'use client'
import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import AddDriver from "@/components/Shared/Admin/AddDriver";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { Ban } from "lucide-react";

interface Driver {
  id: number;
  name: string | null;
  email: string | null;
  phone: string[] | null;
  address: string[] | null;
  bus_id: number | null;
  bus_code: string | null;
  plate_no: string | null;
  coordinator_id: number | null;
  coordinator_name: string | null;
}

interface DriverQueryRow {
  id: number;
  name: string | null;
  email: string | null;
  phone: string[] | null;
  address: string[] | null;
  buses?: {
    id: number;
    bus_code: string;
    plate_no: string;
    coordinators?:
      | {
          id: number;
          name: string;
          email: string;
        }
      | {
          id: number;
          name: string;
          email: string;
        }[]
      | null;
  }[];
}

interface Bus {
  id: number;
  bus_code: string;
  plate_no: string;
}

interface Coordinator {
  id: number;
  name: string;
  email: string;
}

const driverSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bus_id: z.string().optional(),
  coordinator_id: z.string().optional(),
});

type DriverFormValues = z.infer<typeof driverSchema>;

export default function AdminDrivers() {
  const { supabase } = useSupabase();
  const { adminRole } = useAuth();
  const router = useRouter();
  const [isAddDriverModalOpen, setAddDriverModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [filterCoordinator, setFilterCoordinator] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"bus" | "driver">("bus");

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", bus_id: "", coordinator_id: "" },
  });

  const fetchDrivers = useCallback(async () => {
    const { data, error } = await supabase
      .from("driver")
      .select(`
        id, name, email, phone, address,
        buses:buses!buses_driver_fkey (
          id, bus_code, plate_no,
          coordinators:coordinators!buses_coordinator_fkey (id, name, email)
        )
      `);

    if (error) {
      console.error("Error fetching drivers:", error);
      return;
    }

    const rows: DriverQueryRow[] = (data ?? []) as unknown as DriverQueryRow[];
    const formatted = rows.map((d) => {
      const firstBus = d.buses?.[0];
      const coordinators = firstBus?.coordinators;
      const coordinator = Array.isArray(coordinators)
        ? coordinators[0] ?? null
        : coordinators ?? null;
      return {
        id: d.id,
        name: d.name,
        email: d.email,
        phone: d.phone,
        address: d.address,
        bus_id: firstBus?.id ?? null,
        bus_code: firstBus?.bus_code ?? null,
        plate_no: firstBus?.plate_no ?? null,
        coordinator_id: coordinator?.id ?? null,
        coordinator_name: coordinator?.name ?? null,
      };
    });

    setDrivers(sortDrivers(formatted, sortBy));
    setLoading(false);
  }, [supabase, sortBy]);

  const fetchBuses = useCallback(async () => {
    const { data, error } = await supabase
      .from("buses")
      .select("id, bus_code, plate_no, driver, coordinator");
    if (error) console.error("Error fetching buses:", error);
    setBuses(data || []);
  }, [supabase]);

  const fetchCoordinators = useCallback(async () => {
    const { data, error } = await supabase
      .from("coordinators")
      .select("id, name, email");
    if (error) console.error("Error fetching coordinators:", error);
    setCoordinators(data || []);
  }, [supabase]);

  useEffect(() => {
    fetchDrivers();
    fetchBuses();
    fetchCoordinators();
  }, [router, fetchDrivers, fetchBuses, fetchCoordinators]);

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    form.reset({
      name: driver.name || "",
      email: driver.email || "",
      phone: driver.phone?.[0] || "",
      address: driver.address?.[0] || "",
      bus_id: driver.bus_id ? String(driver.bus_id) : "",
      coordinator_id: driver.coordinator_id ? String(driver.coordinator_id) : "",
    });
  };

  const onSubmit = async (values: DriverFormValues) => {
    if (!editingDriver) return;

    // update driver info
    await supabase.from("driver").update({
      name: values.name,
      email: values.email,
      phone: values.phone ? [values.phone] : null,
      address: values.address ? [values.address] : null,
    }).eq("id", editingDriver.id);

    // clear any previous bus assignment
    await supabase.from("buses").update({ driver: null }).eq("driver", editingDriver.id);

    if (values.bus_id) {
      await supabase
        .from("buses")
        .update({
          driver: editingDriver.id,
          coordinator: values.coordinator_id ? Number(values.coordinator_id) : null,
        })
        .eq("id", values.bus_id);
    }

    setEditingDriver(null);
    fetchDrivers();
    fetchBuses();
  };

  // sorting
  const sortDrivers = (list: Driver[], key: "bus" | "driver") => {
    const sorted = [...list];
    if (key === "bus") {
      sorted.sort((a, b) => {
        if (!a.bus_code && !b.bus_code) return 0;
        if (!a.bus_code) return 1;
        if (!b.bus_code) return -1;
        return a.bus_code.localeCompare(b.bus_code);
      });
    } else {
      sorted.sort((a, b) => {
        if (!a.name && !b.name) return 0;
        if (!a.name) return 1;
        if (!b.name) return -1;
        return a.name.localeCompare(b.name);
      });
    }
    return sorted;
  };

  const handleSortChange = (key: "bus" | "driver") => {
    setSortBy(key);
    setDrivers(sortDrivers(drivers, key));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const visibleDrivers = drivers.filter((d) =>
    filterCoordinator === "all" ? true : d.coordinator_id === Number(filterCoordinator)
  );

  return (
    <div className="max-w-6xl mx-auto py-10">
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Drivers & Assigned Buses</CardTitle>
          <div className="flex gap-4 items-center">
            <div className="space-x-2">
              <Button
                size="sm"
                variant={sortBy === "bus" ? "default" : "outline"}
                onClick={() => handleSortChange("bus")}
                className="text-gray-200"
              >
                Sort by Bus
              </Button>
              <Button
                size="sm"
                variant={sortBy === "driver" ? "default" : "outline"}
                onClick={() => handleSortChange("driver")}
              >
                Sort by Driver
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Label className="mr-2 font-medium">Filter by Coordinator:</Label>
              <Select
                value={filterCoordinator}
                onValueChange={(value) => setFilterCoordinator(value)}
              >
                <SelectTrigger className="w-30">
                  <SelectValue placeholder="Select coordinator" />
                </SelectTrigger>
                <SelectContent className="border rounded p-2 bg-white dark:bg-gray-900">
                <SelectItem value="all">All</SelectItem>
                {coordinators.map((c) => (
                  <SelectItem
                   key={c.id} 
                   value={String(c.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                  >
                    {c.name}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
              <span className="p-3">
                <Button
                 className="text-gray-200 ml-auto"
                 onClick={() => {
                  setAddDriverModalOpen(true);
                 }}
                >
                  Add Driver
                </Button>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {visibleDrivers.length === 0 ? (
            <p>No drivers found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Bus Code</TableHead>
                  <TableHead>Plate No</TableHead>
                  <TableHead>Coordinator</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleDrivers.map((d) => (
                  <TableRow key={d.id} className="hover:bg-red-50 hover:text-primary">
                    <TableCell>{d.name || "N/A"}</TableCell>
                    <TableCell>{d.email || "N/A"}</TableCell>
                    <TableCell>{d.phone?.join(", ") || "N/A"}</TableCell>
                    <TableCell>{d.bus_code || "Unassigned"}</TableCell>
                    <TableCell>{d.plate_no || "N/A"}</TableCell>
                    <TableCell>{d.coordinator_name || "Unassigned"}</TableCell>
                    <TableCell>
                     {adminRole !== "viewer" ? ( 
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(d)}
                            className="border-2 flex-1 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary-dark dark:hover:bg-primary-light hover:text-gray-200 dark:hover:text-gray-100"
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white dark:bg-gray-900">
                          <DialogHeader>
                            <DialogTitle>Edit Driver</DialogTitle>
                          </DialogHeader>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
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
                                      <Input type="email" {...field} />
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
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="bus_id"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Assigned Bus</FormLabel>
                                    <Select
                                      value={field.value || ""}
                                      onValueChange={field.onChange}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className='bg-white dark:bg-gray-900'>
                                        <SelectItem
                                         value="N/A"
                                         className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                                        >
                                          Unassigned
                                        </SelectItem>
                                        {buses.map((bus) => (
                                          <SelectItem
                                           key={bus.id} 
                                           value={String(bus.id)}
                                           className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                                          >
                                            {bus.bus_code} ({bus.plate_no})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="coordinator_id"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Assigned Coordinator</FormLabel>
                                    <Select
                                      value={field.value || ""}
                                      onValueChange={field.onChange}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className='bg-white dark:bg-gray-900'>
                                        <SelectItem
                                         value="N/A"
                                         className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                                        >
                                          Unassigned
                                        </SelectItem>
                                        {coordinators.map((c) => (
                                          <SelectItem
                                           key={c.id} 
                                           value={String(c.id)}
                                           className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                                          >
                                            {c.name} ({c.email})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setEditingDriver(null)}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit" className="text-gray-200">Save</Button>
                              </div>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      ):(
                        <span className="text-gray-400 italic"><Ban /></span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Driver Modal */}
      <Modal isOpen2={isAddDriverModalOpen} onClose={() => setAddDriverModalOpen(false)}>
        <AddDriver />
      </Modal>
    </div>
  );
}