'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/contexts/SupabaseContext";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

// ✅ Define schema for validation based on payment table
const paymentSchema = z.object({
  week: z.string().nonempty("Week is required"), // ISO date string
    completed_by: z.enum(["Cleophas", "Emmanuel", "Roland", "Mukaila", "Deborah", "David", "Adaobi"] as const),
    coordinator: z.enum(["Cleophas", "Emmanuel", "Roland", "Mukaila"] as const),
    bus: z.number().int().positive(),
    p_week: z.enum(["First", "Second", "Third", "No Payment Made"] as const),
    receipt: z.any().refine((file) => file?.length > 0, "Receipt is required"),
    amount: z.coerce.number().int().nonnegative(),
    sender: z.string().nullable(),
    payment_day: z.enum(["MON", "TUE", "WED", "THU", "FRIDAY", "SAT", "SUN", "SAT(Early)"] as const),
    payment_date: z.string().nonempty("Payment date is required"), // ISO date
    pay_type: z.enum(["CASH", "ACCOUNT"] as const),
    pay_complete: z.enum(["YES", "NO"] as const),
    issue: z.enum(["N/A - No Issues Collecting Money", "Could Not Reach Driver", "Bus Down", "Driver Late Making Payment", "Bus to be Repossessed", "No Payment Made"] as const),
    inspection: z.enum(["YES", "NO"] as const),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
  const { busId } = useParams<{ busId: string }>();
  const { user, role } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [busCode, setBusCode] = useState<string>("");  

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema) as unknown as import('react-hook-form').Resolver<PaymentFormValues>,
    defaultValues: {
      week: "",
      completed_by: undefined,
      coordinator: undefined,
      bus: Number(busId),
      p_week: undefined,
      receipt: "",
      amount: 0,
      sender: "",
      payment_day: undefined,
      payment_date: "",
      pay_type: "CASH",
      pay_complete: undefined,
      issue: undefined,
      inspection: undefined,
    },
  });

  useEffect(() => {
    if (!user || role !== "coordinator") {
      router.push("/login");
    }
    // fetch bus_code
    const fetchBusCode = async () => {
      const { data } = await supabase.from("buses").select("bus_code").eq("id", busId).single();
      setBusCode(data?.bus_code || `BUS${busId}`);
      form.setValue("bus", Number(busId)); // still keep the id for DB insert
    };
    fetchBusCode();
  }, [user, role, supabase, busId]);

  const onSubmit = async (values: PaymentFormValues) => {
    const file = values.receipt?.[0];
    if (!file) {
      alert("Receipt file is required");
      return;
    }

    // Generate filename
    const ext = file.name.split(".").pop();
    const formattedDate = values.payment_date.split("-").reverse().join(".");
    const newFileName = `${busCode},N${values.amount},${formattedDate},DR Receipt.${ext}`;

    let uploadSuccess = false;
    // Use local storage in development, Supabase Storage in production
    if (process.env.NODE_ENV === "development") {
      // Upload to local API route
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", newFileName);

      const uploadRes = await fetch("/api/upload-receipt", {
        method: "POST",
        body: formData,
      });
      uploadSuccess = uploadRes.ok;
    } else {
      // Upload to Supabase Storage bucket "receipts"
      const { error: uploadError } = await supabase.storage
        .from("receipts")
        .upload(newFileName, file, {
          cacheControl: "3600",
          upsert: true,
        });
      uploadSuccess = !uploadError;
    }

    if (!uploadSuccess) {
      alert("Failed to upload receipt");
      return;
    }

    // Insert payment record (store only filename)
    const { error: insertError } = await supabase.from("payment").insert([
      {
        ...values,
        receipt: newFileName,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return;
    }

    router.push(`/payment/${busId}/history`);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Week */}              
              <FormField
                control={form.control}
                name="week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Week</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Coordinator */}
              <FormField
                control={form.control}
                name="coordinator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordinator Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Coordinator" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cleophas">Cleophas</SelectItem>
                        <SelectItem value="Emmanuel">Emmanuel</SelectItem>
                        <SelectItem value="Roland">Roland</SelectItem>
                        <SelectItem value="Mukaila">Mukaila</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Completed By */}
              <FormField
                control={form.control}
                name="completed_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed By</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cleophas">Cleophas</SelectItem>
                        <SelectItem value="Emmanuel">Emmanuel</SelectItem>
                        <SelectItem value="Roland">Roland</SelectItem>
                        <SelectItem value="Mukaila">Mukaila</SelectItem>
                        <SelectItem value="Deborah">Deborah</SelectItem>
                        <SelectItem value="David">David</SelectItem>
                        <SelectItem value="Adaobi">Adaobi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bus Code (read-only) */}
              <FormField
                control={form.control}
                name="bus"
                render={() => (
                  <FormItem>
                    <FormLabel>Annhurst Bus Code</FormLabel>
                    <FormControl>
                      <Input type="text" value={busCode} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Payment For the week */}
              <FormField
                control={form.control}
                name="p_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment For the Week</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="First">First</SelectItem>
                        <SelectItem value="Second">Second</SelectItem>
                        <SelectItem value="Third">Third</SelectItem>
                        <SelectItem value="No Payment Made">No Payment Made</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Receipt Upload */}
              <FormField
                control={form.control}
                name="receipt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Driver Receipt</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpeg,.jpg,.png,.avif"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount Paid */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Paid</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Day of the Week */}
              <FormField
                control={form.control}
                name="payment_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Payment Date (Day of week)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Day of Week" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SAT(Early)">SAT (Early)</SelectItem>
                        <SelectItem value="SUN">SUN</SelectItem>
                        <SelectItem value="MON">MON</SelectItem>
                        <SelectItem value="TUE">TUE</SelectItem>
                        <SelectItem value="WED">WED</SelectItem>
                        <SelectItem value="THU">THU</SelectItem>
                        <SelectItem value="FRI">FRI</SelectItem>
                        <SelectItem value="SAT">SAT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actual Payment Date (Date) */}
              <FormField
                control={form.control}
                name="payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Payment Date (Date)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cash/Account */}
              <FormField
                control={form.control}
                name="pay_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cash or Account Payment</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CASH">CASH</SelectItem>
                        <SelectItem value="ACCOUNT">ACCOUNT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sender's Name */}
              <FormField
                control={form.control}
                name="sender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender&apos;s Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sender Name" {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Payment Complete */}
              <FormField
                control={form.control}
                name="pay_complete"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Complete (for this week)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Issues Collecting Money */}
              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issues Collecting Money</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="N/A - No Issues Collecting Money">N/A - No Issues Collecting Money</SelectItem>
                        <SelectItem value="Could Not Reach Driver">Could Not Reach Driver</SelectItem>
                        <SelectItem value="Bus Down">Bus Down</SelectItem>
                        <SelectItem value="Driver Late Making Payment">Driver Late Making Payment</SelectItem>
                        <SelectItem value="Bus to be Repossessed">Bus to be Repossessed</SelectItem>
                        <SelectItem value="No Payment Made">No Payment Made</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Monthly Bus Inspection */}
              <FormField
                control={form.control}
                name="inspection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bus Inspection Completed</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />                    
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit Payment
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
