// components/EventAttendance.tsx
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UsersIcon, CheckCircleIcon } from "lucide-react";
import { GetEventAttendanceResponse } from "@/types/Attendance";
import { useAttendanceQuery } from "@/hooks/event/useAttendance";

interface EventAttendanceProps {
  eventId: string;
}

export function EventAttendance({ eventId }: EventAttendanceProps) {
  const [attendanceData, setAttendanceData] =
    useState<GetEventAttendanceResponse | null>(null);

  const { data, isLoading } = useAttendanceQuery(eventId);

  useEffect(() => {
    if (data) {
      setAttendanceData(data.data);
    }
  }, [data, eventId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-50" />
      </div>
    );
  }

  if (!attendanceData) {
    return (
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>No attendance data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Event Summary Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{attendanceData.title}</CardTitle>
          <CardDescription>Attendance Overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(attendanceData.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <UsersIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Tickets</p>
                <p className="text-sm text-muted-foreground">
                  {attendanceData.totalTickets}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Scanned</p>
                <p className="text-sm text-muted-foreground">
                  {attendanceData.scannedTickets}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Attendees</CardTitle>
          <CardDescription>
            List of all attendees for {attendanceData.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Ticket ID
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Scanned At
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.attendance.map((attendee) => (
                  <TableRow key={attendee.ticketId}>
                    <TableCell className="font-medium">
                      {attendee.firstName} {attendee.lastName}
                    </TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {attendee.ticketId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          attendee.status === "USED"
                            ? "default"
                            : attendee.status === "CANCELLED"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {attendee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {attendee.scannedAt
                        ? new Date(attendee.scannedAt).toLocaleString()
                        : "Not scanned"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
