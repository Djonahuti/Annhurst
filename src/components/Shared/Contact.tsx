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
          .from("attachments")
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

      // get receiver (coordinator)
      const { data: coord } = await supabase
        .from("coordinators")
        .select("id, name, email")
        .eq("id", coordinatorId)
        .single();

      payload.driver = driver?.id || null;
      payload.coordinator = coordinatorId;
      payload.sender = driver?.name || user?.email;
      payload.sender_email = driver?.email || user?.email;
      payload.receiver = coord?.name || "Unknown";
      payload.receiver_email = coord?.email || "";
    } else if (role === "coordinator") {
      // get sender (coordinator)
      const { data: coord } = await supabase
        .from("coordinators")
        .select("id, name, email")
        .eq("email", user?.email)
        .single();

      // get receiver (driver)
      const { data: driver } = await supabase
        .from("driver")
        .select("id, name, email")
        .eq("id", driverId) // 👈 driverId is passed from props
        .single();

      payload.coordinator = coord?.id || null;
      payload.driver = driverId;
      payload.sender = coord?.name || user?.email;
      payload.sender_email = coord?.email || user?.email;
      payload.receiver = driver?.name || "Unknown";
      payload.receiver_email = driver?.email || "";      
    }

    const { error } = await supabase.from("contact").insert(payload);

    setLoading(false);

    if (error) {
      console.error("Failed to send message:", error);
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
    <Card className="w-full max-w-md space-y-8 p-4">
    <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="block text-sm font-medium mb-1">Subject</Label>
        <Select onValueChange={(val) => setSelectedSubject(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
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
