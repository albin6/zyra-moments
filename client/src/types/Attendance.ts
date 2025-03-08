export interface AttendanceItem {
  ticketId: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isScanned: boolean;
  scannedAt?: Date;
  status: "PURCHASED" | "USED" | "CANCELLED";
}

export interface GetEventAttendanceResponse {
  eventId: string;
  title: string;
  date: Date;
  attendance: AttendanceItem[];
  totalTickets: number;
  scannedTickets: number;
}
