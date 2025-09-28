"use client"
import { MailContext } from "@/contexts/MailContext"
import * as React from "react"

export default function Inbox() {
  const { selectedMail } = React.useContext(MailContext)

  if (!selectedMail) {
    return (
      <div className="flex-1 p-6 text-muted-foreground">
        Select a message to view
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 space-y-4">
      <h2 className="text-xl font-semibold">{selectedMail.subject?.subject}</h2>
      <div className="text-sm text-muted-foreground">
        From: {selectedMail.sender} ({selectedMail.sender_email}){" "}
        <br />To: {selectedMail.receiver} ({selectedMail.receiver_email})
      </div>
      <div className="text-sm text-muted-foreground">
        Date: {new Date(selectedMail.created_at).toLocaleString()}
      </div>
      <hr className="my-2" />
      <p className="whitespace-pre-line">{String(selectedMail.message)}</p>
    </div>
  )
}
