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
  const [supabaseUrls, setSupabaseUrls] = useState<Record<string, string>>({});
  const { busId } = useParams<{ busId: string }>();
  const { user, role } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiptsLoading, setReceiptsLoading] = useState(false);

  useEffect(() => {
    if (!user || (role !== "coordinator" && role !== "driver")) {
      router.push("/login");
      return;
    }

    const fetchPaymentsAndReceipts = async () => {
      setLoading(true);
      setReceiptsLoading(true);
      const { data, error } = await supabase
        .from("payment")
        .select("*")
        .eq("bus", busId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching payments:", error);
        setPayments([]);
        setLoading(false);
        setReceiptsLoading(false);
        return;
      }
      setPayments(data as Payment[]);
      setLoading(false);

      // Preload Supabase public URLs for receipts
      const urls: Record<string, string> = {};
      for (const p of data as Payment[]) {
        if (p.receipt) {
          const { data: urlData } = supabase.storage.from("receipts").getPublicUrl(p.receipt);
          urls[p.receipt] = urlData?.publicUrl || "";
        }
      }
      setSupabaseUrls(urls);
      setReceiptsLoading(false);
    };

    fetchPaymentsAndReceipts();
  }, [user, role, supabase, busId]);

  if (loading || receiptsLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full" />
        <div className="text-center text-gray-500 mt-4">Loading receipts...</div>
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
                  const localUrl = p.receipt ? `/receipts/dr/${encodeURIComponent(p.receipt)}` : null;
                  const supabaseUrl = p.receipt ? supabaseUrls[p.receipt] : null;
                  const isSupabaseValid = supabaseUrl && supabaseUrl !== "" && !supabaseUrl.endsWith("/receipts/");
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        {p.payment_date || p.created_at.split("T")[0]}
                      </TableCell>
                      <TableCell>{p.amount ?? 0}</TableCell>
                      <TableCell>{p.pay_type ?? "-"}</TableCell>
                      <TableCell>{p.sender ?? "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          {isSupabaseValid && (
                            <div className="border rounded p-2">
                              <div className="font-semibold mb-1">Link 1</div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  className="p-0 text-primary underline"
                                  onClick={() => {
                                    setPreviewUrl(supabaseUrl);
                                    setShowModal(true);
                                  }}
                                >
                                  <Eye />
                                </Button>
                                <a
                                  href={supabaseUrl}
                                  download
                                  className="text-primary underline"
                                >
                                  <Download />
                                </a>
                              </div>
                            </div>
                          )}
                          {localUrl && (
                            <div className="border rounded p-2">
                              <div className="font-semibold mb-1">Link 2</div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  className="p-0 text-primary underline"
                                  onClick={() => {
                                    setPreviewUrl(localUrl);
                                    setShowModal(true);
                                  }}
                                >
                                  <Eye />
                                </Button>
                                <a
                                  href={localUrl}
                                  download
                                  className="text-primary underline"
                                >
                                  <Download />
                                </a>
                              </div>
                            </div>
                          )}
                          {!isSupabaseValid && !localUrl && "-"}
                        </div>
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
              <iframe
                src={previewUrl}
                className="w-full h-96"
                title="PDF Preview"
                onError={(e) => {
                  // fallback to local file if supabase fails
                  if (previewUrl && previewUrl.startsWith("http")) {
                    const localFallback = `/receipts/dr/${encodeURIComponent(previewUrl.split('/').pop() || '')}`;
                    setPreviewUrl(localFallback);
                  }
                }}
              />
            ) : (
              previewUrl && <img
                src={previewUrl}
                alt="Receipt"
                className="w-full max-h-96 object-contain"
                onError={(e) => {
                  // fallback to local file if supabase fails
                  if (previewUrl && previewUrl.startsWith("http")) {
                    const localFallback = `/receipts/dr/${encodeURIComponent(previewUrl.split('/').pop() || '')}`;
                    setPreviewUrl(localFallback);
                  }
                }}
              />
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
