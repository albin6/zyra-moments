import { Client } from "@/services/client/clientService";
import {
  CalendarDays,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  UserCheck,
} from "lucide-react";
import moment from "moment";

interface ProfileInfoProps {
  data: Client;
}

export function ProfileInfo({ data }: ProfileInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoItem
          icon={UserCheck}
          label="Full Name"
          value={`${data.firstName} ${data.lastName}`}
        />
        <InfoItem icon={Mail} label="Email" value={data.email} />
        <InfoItem icon={Phone} label="Phone" value={data.phoneNumber} />
        <InfoItem icon={Briefcase} label="Status" value={data.status} />
        <InfoItem
          icon={CalendarDays}
          label="Joined"
          value={moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        />
        <InfoItem icon={MapPin} label="Location" value="N/A" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Additional Info</h3>
        <p className="text-muted-foreground">
          {data.masterOfCeremonies
            ? "This client is a Master of Ceremonies."
            : "Not a Master of Ceremonies."}
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium">{label}:</span>
      <span>{value || "N/A"}</span>
    </div>
  );
}
