import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Camera } from "lucide-react";
import { useState } from "react";
import { uploadToCloudinary } from "@/utils/upload-cloudinary/cloudinary";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  phoneNumber: string;
  bio: string;
  place: string;
  isEdit: boolean;
  onUpdate?: (field: string, value: string) => void;
}

export function ProfileForm({
  firstName,
  lastName,
  email,
  profileImage,
  phoneNumber,
  bio,
  place,
  onUpdate,
  isEdit,
}: ProfileFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const secureUrl = await uploadToCloudinary(file);
        onUpdate?.("profileImage", secureUrl);
        setIsOpen(false);
      } catch (error) {
        toast.error("Failed to upload image");
        console.log("Failed to upload image", error);
      } finally {
        setIsUploading(false);
      }
    }
  };
  return (
    <div className="p-6">
      <div className="flex md:flex-col gap-6">
        <div className="flex  items-center space-x-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Avatar
                className={`w-20 h-20 ${
                  isEdit ? "cursor-pointer hover:opacity-90" : ""
                } transition-opacity`}
              >
                <AvatarImage src={profileImage} alt={firstName} />
                <AvatarFallback className="bg-primary/10">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            {isEdit && (
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Profile Picture</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-6 py-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profileImage} alt={firstName} />
                    <AvatarFallback className="bg-primary/10 text-xl">
                      {firstName.charAt(0) + lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="picture" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                        <Camera size={20} />
                        <span>
                          {isUploading
                            ? "Uploading..."
                            : profileImage
                            ? "Change Picture"
                            : "Add Picture"}
                        </span>
                      </div>
                      <input
                        id="picture"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageSelect}
                        disabled={isUploading}
                      />
                    </label>
                    {profileImage && (
                      <Button
                        variant="ghost"
                        className="text-sm text-muted-foreground"
                        onClick={() => {
                          onUpdate?.("profileImage", "");
                          setIsOpen(false);
                        }}
                        disabled={isUploading}
                      >
                        Remove Picture
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
          <div className="flex flex-col">
            <span className="text-base text-foreground">
              {firstName + " " + lastName}
            </span>
            <span className="text-sm text-muted-foreground">{email}</span>
          </div>
        </div>

        <div className="flex-1 grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                value={firstName}
                onChange={(e) => onUpdate?.("firstName", e.target.value)}
                disabled={isEdit === false}
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                value={lastName}
                onChange={(e) => onUpdate?.("lastName", e.target.value)}
                disabled={isEdit === false}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={email}
                onChange={(e) => onUpdate?.("email", e.target.value)}
                disabled={true}
                type="email"
                placeholder="vendor@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <Input
                value={phoneNumber}
                onChange={(e) => onUpdate?.("phoneNumber", e.target.value)}
                disabled={isEdit === false}
                type="tel"
                placeholder="Enter contact number"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Place</label>
              <Input
                value={place}
                onChange={(e) => onUpdate?.("place", e.target.value)}
                disabled={isEdit === false}
                type="text"
                placeholder="Enter Your Place"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">About Me</label>
              <Textarea
                value={bio}
                onChange={(e) => onUpdate?.("bio", e.target.value)}
                disabled={isEdit === false}
                placeholder="Tell us about yourself and your services..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
