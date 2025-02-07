import { CalendarDays, MapPin, Mail, Phone, Briefcase } from "lucide-react";

export function ProfileInfo() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoItem icon={MapPin} label="Location" value="New York, NY" />
        <InfoItem icon={Mail} label="Email" value="john.doe@example.com" />
        <InfoItem icon={Phone} label="Phone" value="+1 (555) 123-4567" />
        <InfoItem
          icon={Briefcase}
          label="Occupation"
          value="Event Planner at XYZ Company"
        />
        <InfoItem icon={CalendarDays} label="Joined" value="January 2023" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Bio</h3>
        <p className="text-muted-foreground">
          Passionate event planner with 5+ years of experience. Love creating
          unforgettable experiences for clients and attendees alike.
        </p>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
