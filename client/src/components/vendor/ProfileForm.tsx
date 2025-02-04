import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  contact: string;
}

export function ProfileForm({
  firstName,
  lastName,
  email,
  avatarUrl,
  contact,
}: ProfileFormProps) {
  return (
    <div className="p-6">
      <div className="flex md:flex-col gap-6">
        {/* <div className="flex  items-center space-x-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatarUrl} alt={vendorName} />
            <AvatarFallback>{vendorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{vendorName}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div> */}

        <div className="flex-1 grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input value={firstName} placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input value={lastName} placeholder="Enter last name" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={email}
                type="email"
                placeholder="vendor@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <Input
                value={contact}
                type="tel"
                placeholder="Enter contact number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">About Me</label>
            <Textarea
              placeholder="Tell us about yourself and your services..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
