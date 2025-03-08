import { getEventAttendance } from "@/services/event/attendanceService";
import { useQuery } from "@tanstack/react-query";

export const useAttendanceQuery = (eventId: any) => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: () => getEventAttendance(eventId),
  });
};
