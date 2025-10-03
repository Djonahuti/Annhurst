'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/contexts/SupabaseContext";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ContactProps {
  coordinatorId?: number | null;
  driverId?: number | null;
  onSuccess?: () => void;
}

interface Subject {
  id: number;
  subject: string;
}

export default function Contact({ coordinatorId, driverId, onSuccess }: ContactProps) {
  const { user, role } = useAuth();
  const { supabase } = useSupabase();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentName, setCurrentName] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [receiverType, setReceiverType] = useState<'coordinator' | 'driver' | null>(null);
  type Receiver = { id: number; name: string; email: string };
  const [coordinatorsList, setCoordinatorsList] = useState<Receiver[]>([]);
  const [driversList, setDriversList] = useState<Receiver[]>([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(null);

  // Load subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("subject").select("*");
      if (!error && data) setSubjects(data as Subject[]);
    };
    fetchSubjects();
  }, [supabase]);

  // Fetch current user name depending on role
  useEffect(() => {
    const fetchName = async () => {
      if (!user) return;
      if (role === "driver") {
        const { data } = await supabase
          .from("driver")
          .select("name, email")
          .eq("email", user.email)
          .single();
        if (data?.name) setCurrentName(data.name);
        if (data?.email) setCurrentEmail(data.email);
      } else if (role === "coordinator") {
        const { data } = await supabase
          .from("coordinators")
          .select("name, email")
          .eq("email", user.email)
          .single();
        if (data?.name) setCurrentName(data.name);
        if (data?.email) setCurrentEmail(data.email);
      }
    };
    fetchName();
  }, [user, role, supabase]);  

  // If admin, fetch lists of potential receivers
  useEffect(() => {
    const fetchLists = async () => {
      if (role !== 'admin') return;
  const { data: coords } = await supabase.from('coordinators').select('id, name, email');
  const { data: drs } = await supabase.from('driver').select('id, name, email');
  if (coords) setCoordinatorsList(coords as Receiver[]);
  if (drs) setDriversList(drs as Receiver[]);
    }
    fetchLists();
  }, [role, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !message.trim()) {
      alert("Please select subject and enter message.");
      return;
    }

    setLoading(true);

    let attachmentUrl: string | null = null;

    // Upload file if present
    if (file) {
      const filePath = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("receipts")
        .upload(filePath, file);

      if (uploadError) {
        console.error("File upload failed:", uploadError);
        alert("Attachment upload failed.");
      } else {
        const { data: urlData } = supabase.storage
          .from("receipts")
          .getPublicUrl(filePath);
        attachmentUrl = urlData.publicUrl;
      }
    }

    type ContactPayload = {
      subject: number | null;
      message: string;
      sender: string | undefined;
      sender_email: string | undefined;
      attachment: string | null;
      driver?: number | null;
      coordinator?: number | null;
      receiver?: string;
      receiver_email?: string;
    };
    const payload: ContactPayload = {
      subject: selectedSubject,
      message,
      sender: currentName || user?.email,
      sender_email: currentEmail || user?.email,
      attachment: attachmentUrl,
    };

    if (role === "driver") {
      // get sender (driver)
      const { data: driver } = await supabase
        .from("driver")
        .select("id, name, email")
        .eq("email", user?.email)
        .single();

      // resolve coordinator: prefer provided prop, else derive from buses by driver
      let resolvedCoordinatorId: number | null = coordinatorId ?? null;
      if (!resolvedCoordinatorId && driver?.id) {
        const { data: busRows } = await supabase
          .from("buses")
          .select("coordinator")
          .eq("driver", driver.id)
          .limit(1);
        const coordinatorFromBus = Array.isArray(busRows) && busRows.length > 0 ? (busRows[0] as { coordinator: number | null }).coordinator : null;
        resolvedCoordinatorId = coordinatorFromBus ?? null;
      }

      // get receiver (coordinator) details if we have an id
      let coord: { id?: number | null; name?: string; email?: string } | null = null;
      if (resolvedCoordinatorId) {
        const { data: coordData } = await supabase
          .from("coordinators")
          .select("id, name, email")
          .eq("id", resolvedCoordinatorId)
          .single();
        coord = coordData;
      }

      payload.driver = driver?.id || null;
      payload.coordinator = resolvedCoordinatorId;
      payload.sender = driver?.name || user?.email;
      payload.sender_email = driver?.email || user?.email;
      payload.receiver = coord?.name || "Unknown";
      payload.receiver_email = coord?.email || "";
    } else if (role === "coordinator") {
      // Determine sender coordinator (prefer prop if provided)
      let coordRecord: { id?: number | null; name?: string; email?: string } | null = null;
      if (coordinatorId) {
        // If coordinatorId prop was passed, try to fetch the coordinator by id to get name/email
        const { data: coordById, error: coordByIdErr } = await supabase
          .from("coordinators")
          .select("id, name, email")
          .eq("id", coordinatorId)
          .single();
        if (!coordByIdErr && coordById) coordRecord = coordById;
      }

      if (!coordRecord) {
        const { data: coordByEmail } = await supabase
          .from("coordinators")
          .select("id, name, email")
          .eq("email", user?.email)
          .single();
        if (coordByEmail) coordRecord = coordByEmail;
      }

      // get receiver (driver) if driverId provided
      let driver: { id?: number | null; name?: string; email?: string } | null = null;
      if (driverId) {
        const { data: driverData } = await supabase
          .from("driver")
          .select("id, name, email")
          .eq("id", driverId)
          .single();
        driver = driverData;
      }

      payload.coordinator = coordRecord?.id || null;
      payload.driver = driverId || null;
      payload.sender = coordRecord?.name || currentName || user?.email;
      payload.sender_email = coordRecord?.email || currentEmail || user?.email;
      payload.receiver = driver?.name || "";
      payload.receiver_email = driver?.email || "";
    }

    // If admin, allow selecting receiver type and specific receiver
    if (role === 'admin') {
      // fetch admin sender details
      const { data: admin } = await supabase
        .from('admins')
        .select('id, name, email')
        .eq('email', user?.email)
        .single();

      payload.sender = admin?.name || user?.email;
      payload.sender_email = admin?.email || user?.email;

      if (!receiverType || !selectedReceiverId) {
        alert('Please select receiver type and receiver.');
        setLoading(false);
        return;
      }

      if (receiverType === 'coordinator') {
        const receiver = coordinatorsList.find(c => c.id === selectedReceiverId);
        payload.coordinator = receiver?.id || null;
        payload.receiver = receiver?.name || 'Unknown';
        payload.receiver_email = receiver?.email || '';
        payload.driver = null;
      } else {
        const receiver = driversList.find(d => d.id === selectedReceiverId);
        payload.driver = receiver?.id || null;
        payload.receiver = receiver?.name || 'Unknown';
        payload.receiver_email = receiver?.email || '';
        payload.coordinator = null;
      }
    }

    // Debug: log payload and context so we can see why coordinator/receiver fields may be empty
    // eslint-disable-next-line no-console
    console.log("Contact submit", { role, coordinatorId, driverId, payload });

    const { error } = await supabase.from("contact").insert(payload);

    setLoading(false);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to send message:", error, { payload });
      toast.error("Failed to send message.");
    } else {
      toast.success("Message sent!");
      setMessage("");
      setSelectedSubject(null);
      setFile(null);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Card className="w-full max-w-md space-y-8 p-4 bg-gray-50 dark:bg-gray-900/90">
    <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="block text-sm font-medium mb-1">Subject</Label>
        <Select onValueChange={(val) => setSelectedSubject(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent className="bg-gray-50 dark:bg-gray-900/90">
            {subjects.map((subj) => (
              <SelectItem
               key={subj.id} 
               value={String(subj.id)}
               className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
              >
                {subj.subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
        />
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Sender</Label>
        <div className="flex gap-2">
        <Input
          type="text"
          value={currentName}
          readOnly
          className="border rounded px-3 py-2"
        />
        <Input
          type="text"
          value={currentEmail}
          readOnly
          className="border rounded px-3 py-2"
        />    
        </div>    
      </div>

      {role === 'admin' && (
        <div>
          <Label className="block text-sm font-medium mb-1">Send to</Label>
          <div className="flex gap-2">
            <Select onValueChange={(val) => { setReceiverType(val as 'coordinator' | 'driver'); setSelectedReceiverId(null); }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose receiver type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 dark:bg-gray-900/90">
                <SelectItem
                 value="coordinator"
                 className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                >
                  Coordinator
                </SelectItem>
                <SelectItem
                 value="driver"
                 className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                >
                  Driver
                </SelectItem>
              </SelectContent>
            </Select>

            {receiverType === 'coordinator' && (
              <Select onValueChange={(val) => setSelectedReceiverId(Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coordinator" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50 dark:bg-gray-900/90">
                  {coordinatorsList.map(c => (
                    <SelectItem
                     key={c.id} 
                     value={String(c.id)}
                     className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                    >{c.name} - {c.email}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {receiverType === 'driver' && (
              <Select onValueChange={(val) => setSelectedReceiverId(Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50 dark:bg-gray-900/90">
                  {driversList.map(d => (
                    <SelectItem
                     key={d.id} 
                     value={String(d.id)}
                     className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
                    >{d.name} - {d.email}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      )}

      <div>
        <Label className="block text-sm font-medium mb-1">Attachment</Label>
        <Input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
      </div>         

      <Button type="submit" disabled={loading} className="text-gray-200">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
    </CardContent>
    </Card>
  );
}
