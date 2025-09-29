'use client'
// src/pages/payment/PaymentHistory.tsx
import { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import { useRef } from "react";
import { Download, Eye } from "lucide-react";

interface Payment {
  id: number;
  created_at: string;
  week: string | null;
  coordinator: string | null;
  bus: number | null;
  p_week: string | null;
  receipt: string | null;
  amount: number | null;
  sender: string | null;
  payment_day: string | null;
  payment_date: string | null;
  pay_type: string | null;
  pay_complete: boolean | null;
  issue: string | null;
  inspection: boolean | null;
}

export default function PaymentHistory() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { busId } = useParams<{ busId: string }>();
  const { user, role } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || (role !== "coordinator" && role !== "driver")) {
      router.push("/login");
      return;
    }

    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from("payment")
        .select("*")
        .eq("bus", busId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching payments:", error);
        setPayments([]);
      } else {
        setPayments(data as Payment[]);
      }
      setLoading(false);
    };

    fetchPayments();
  }, [user, role, supabase, busId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Payment History (Bus #{busId})</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p>No payments recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Inspection</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => {
                  const receiptUrl = p.receipt ? `/receipts/dr/${encodeURIComponent(p.receipt)}` : null;
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        {p.payment_date || p.created_at.split("T")[0]}
                      </TableCell>
                      <TableCell>{p.amount ?? 0}</TableCell>
                      <TableCell>{p.pay_type ?? "-"}</TableCell>
                      <TableCell>{p.sender ?? "-"}</TableCell>
                      <TableCell>
                        {receiptUrl ? (
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              className="p-0 text-primary underline"
                              onClick={() => {
                                setPreviewUrl(receiptUrl);
                                setShowModal(true);
                              }}
                            >
                              <Eye />
                            </Button>
                            <a
                              href={receiptUrl}
                              download
                              className="ml-2 text-primary underline"
                            >
                              <Download />
                            </a>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {p.pay_complete ? (
                          <span className="text-green-600 font-medium">Complete</span>
                        ) : (
                          <span className="text-red-600 font-medium">Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {p.inspection ? "✔️" : "❌"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {/* Modal for preview using Modal.tsx */}
          <Modal isOpen={showModal && !!previewUrl} onClose={() => setShowModal(false)}>
            <h2 className="text-lg font-bold mb-4">Receipt Preview</h2>
            {previewUrl && previewUrl.match(/\.(pdf)$/i) ? (
              <iframe src={previewUrl} className="w-full h-96" title="PDF Preview" />
            ) : (
              previewUrl && <img src={previewUrl} alt="Receipt" className="w-full max-h-96 object-contain" />
            )}
            <div className="mt-4 flex justify-end">
              <a href={previewUrl || undefined} download className="mr-2">
                <Button>Download</Button>
              </a>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </Modal>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => router.push(`/payment/${busId}`)}>
            Add New Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
