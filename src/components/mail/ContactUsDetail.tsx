'use client'
import { useEffect, useState } from "react"
import Link from "next/link";
import { supabase } from "@/lib/supabase/client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation";

interface ContactUs {
  id: number
  created_at: string
  name: string | null
  email: string | null
  phone: string | null
  company: string | null
  subject: string | null
  message: string | null
}

export default function ContactUsDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter();
  const [contact, setContact] = useState<ContactUs | null>(null)

  useEffect(() => {
    const fetchContactUs = async () => {
      const { data, error } = await supabase
        .from("contact_us")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching contact_us:", error.message)
      } else {
        setContact(data)
      }
    }
    if (id) fetchContactUs()
  }, [id])

  if (!contact) {
    return <p className="p-4">Loading contact details...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Company:</strong> {contact.company}</p>
          <p><strong>Subject:</strong> {contact.subject}</p>
          <p><strong>Message:</strong></p>
          <p className="whitespace-pre-line">{contact.message}</p>
          <p className="text-sm text-gray-500">Received: {new Date(contact.created_at).toLocaleString()}</p>
          <Button className="mt-4" onClick={() => router.back()}>Back</Button>
        </CardContent>
      </Card>
    </div>
  )
}
