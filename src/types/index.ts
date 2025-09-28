export type Contact = {
    id: number;
    coordinator_id: number;
    driver_id: number;
    subject_id: number;
    message: Text | string;
    created_at: string;
    transaction_date: string | null;
    is_starred: boolean;
    is_read: boolean;
    attachment: string | null;
    sender: string;
    receiver: string;
    sender_email: string;
    receiver_email: string;
    driver?: { name: string; email: string; avatar: string } | null;
    subject?: { subject?: string } | null;
    coordinator?: { customer_name?: string; customer_email?: string } | null;
    source?: "contact" | "contact_us"; // to distinguish between contact and contact_us records
}

export type Admin = {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
    created_at: string;
}