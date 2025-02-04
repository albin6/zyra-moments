import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ProfileForm } from "@/components/vendor/ProfileForm";
import { ProfileHeader } from "@/components/vendor/ProfileHeader";
import { Sidebar } from "@/components/vendor/Sidebar";
import { useEffect, useState } from "react";

interface Vendor {
  _id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  category: string;
}

export default function VendorProfile() {
  const [vendorData, setVendorData] = useState<Vendor>();

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit clicked");
  };

  return (
    <div className="container mx-auto flex p-6 justify-between bg-background">
      <Sidebar
        vendorName={`${vendorData?.firstName} ${vendorData?.lastName}`}
        avatarUrl={""}
      />

      <main className="container">
        <Card className="max-w-6xl ms-auto">
          <ProfileHeader onEdit={handleEdit} />
          <ProfileForm
            firstName={vendorData?.firstName!}
            lastName={vendorData?.lastName!}
            email={vendorData?.email!}
            avatarUrl={""}
            contact={vendorData?.phoneNumber!}
          />
        </Card>
      </main>
    </div>
  );
}
