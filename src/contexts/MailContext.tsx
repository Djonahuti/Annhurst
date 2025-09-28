'use client'
import { Contact } from "@/types"
import { createContext } from "react"

export type MailContextType = {
  selectedMail: Contact | null
  setSelectedMail: (mail: Contact | null) => void
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export const MailContext = createContext<MailContextType>({
  selectedMail: null,
  setSelectedMail: () => {},
  activeFilter: "Inbox",
  setActiveFilter: () => {},
})