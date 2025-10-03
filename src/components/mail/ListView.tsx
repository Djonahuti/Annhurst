'use client'
import { useState, useEffect, useContext } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { MailContext } from "@/contexts/MailContext"
import type { Contact } from "@/types"
// Ensure Contact.message allows string type

/**
 * ListView: a full-screen list of inbox messages for mobile.
 * Fetches contacts from Supabase and calls setSelectedMail on tap.
 */
export default function ListView() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const { setSelectedMail, activeFilter } = useContext(MailContext)
  const { user, role } = useAuth()  

  const handleSelectMail = async (mail: Contact) => {
    setSelectedMail(mail); // This now pushes it to Inbox.tsx

    if (mail.source !== "contact_us") {
      // Only mark normal contact rows as read
      await supabase
        .from("contact")
        .update({ is_read: true })
        .eq("id", mail.id)
    }
  };

  // Fetch messages
  useEffect(() => {
    const fetchContacts = async () => {
      let query = supabase
        .from('contact')
        .select('*, driver(name, email, avatar), subject(subject)')
        .order('created_at', { ascending: false });

      // Role-based visibility rules
      if (role === 'driver' || role === 'coordinator') {
        if (activeFilter === 'Sent') {
          query = query.eq('sender_email', user?.email || '')
        } else {
          query = query.eq('receiver_email', user?.email || '')
        }
      } else if (role === 'admin') {
        if (activeFilter === 'Sent') {
          query = query.eq('sender_email', user?.email || '')
        } else {
          query = query.neq('sender_email', user?.email || '')
        }
      }

      // Additional UI filters
      if (activeFilter === 'Starred') {
        query = query.eq('is_starred', true);
      } else if (activeFilter === 'Important' && role !== 'admin') {
        query = query.eq('is_read', false);
      }

      // fetch normal contacts after all filters
      const { data, error } = await query
      let mapped: Contact[] = []
      if (!error && data) {
        mapped = (data as Contact[]).map((c) => ({
          ...c,
          source: 'contact',
        }))
      }

      // Admin: augment Important with external contact_us
      let normalizedContacts: Contact[] = []
      if (role === 'admin' && activeFilter === 'Important') {
        const { data: contactUs } = await supabase
          .from('contact_us')
          .select('*')
          .order('created_at', { ascending: false })

        if (contactUs) {
          type ContactUs = {
            id: number;
            name?: string;
            email?: string;
            subject?: string;
            message: string;
            created_at: string;
          };
          normalizedContacts = (contactUs as ContactUs[]).map((c) => ({
            id: c.id,
            coordinator_id: 0,
            driver_id: 0,
            subject_id: 0,
            message: c.message,
            created_at: c.created_at,
            transaction_date: null,
            is_starred: false,
            is_read: false,
            attachment: null,
            sender: c.name || 'Unknown',
            receiver: 'Admin',
            sender_email: c.email || '',
            receiver_email: '',
            driver: null,
            subject: { subject: c.subject || 'Contact Us' },
            coordinator: null,
            source: 'contact_us',
          }))
        }
      }

      setContacts([...mapped, ...normalizedContacts])
    }

    fetchContacts()
  }, [activeFilter, role, user])

  // Helpers for time formatting
  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const getRelativeTime = (date: Date): string => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    const mins = Math.floor(diff / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)

    if (diff < 60) return 'Just now'
    if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    if (days === 1) return 'A day ago'
    return `${days} days ago`
  }

  const formatSubmittedAt = (timestamp: string): string => {
    const date = new Date(timestamp)
    return `${formatTime(date)} · ${getRelativeTime(date)}`
  };

  const toggleStar = async (contact: Contact) => {
    const newStarredStatus = !contact.is_starred;
    await supabase
      .from('contact')
      .update({ is_starred: newStarredStatus })
      .eq('id', contact.id);
    
    // Update local state
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === contact.id ? { ...c, is_starred: newStarredStatus } : c
      )
    );
  };  

  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={`${contact.source}-${contact.id}`}
          onClick={() => setSelectedMail(contact)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setSelectedMail(contact);
          }}
          className={`w-full text-left flex flex-col gap-2 border-b p-4 hover:bg-red-50 hover:text-primary hover:border-primary ${
            contact.is_read ? 'myBox' : 'unread'
          }`}
        >
          <div className="flex items-center gap-2">
            <Avatar>
            {contact.driver?.avatar ? (
              <AvatarImage
                src={`https://uffkwmtehzuoivkqtefg.supabase.co/storage/v1/object/public/receipts/${contact.driver?.avatar}`}
                alt={contact.driver?.name}
                className="w-6 h-6 rounded-full object-cover"
              />                     
            ):(
              <AvatarFallback className="rounded-lg">{(activeFilter === 'Sent' ? (contact.receiver || '') : (contact.sender || '')).substring(0, 2).toUpperCase()}</AvatarFallback>
            )}
            </Avatar>
            <span className="font-medium">{activeFilter === 'Sent' ? (contact.receiver || contact.sender) : contact.sender}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {formatSubmittedAt(contact.created_at)}
            </span>
          </div>
          <div className="flex justify-between space-x-8 items-center relative gap-1">
          <span className="text-sm font-semibold">{contact.subject?.subject}</span>
          <a
            href="#"
            key={contact.id}
            onClick={() => handleSelectMail(contact)}
            className="text-lg left-2 text-yellow-500 hover:text-yellow-600"
          >
              <button onClick={() => toggleStar(contact)}>
                {contact.is_starred ? '★' : '☆'} {/* Star icon */}
              </button>
          </a>                      
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {String(contact.message)}
          </p>
        </div>
      ))}
    </div>
  )
}
