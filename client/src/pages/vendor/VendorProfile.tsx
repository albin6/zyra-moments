import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ProfileForm } from "@/components/vendor/ProfileForm";
import { ProfileHeader } from "@/components/vendor/ProfileHeader";
import { Sidebar } from "@/components/vendor/Sidebar";
import { useVendorProfileQuery } from "@/hooks/vendor/useVendorProfile";
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
  category: {
    _id: string;
    title: string;
  };
}

export default function VendorProfile() {
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading } = useVendorProfileQuery();

  useEffect(() => {
    if (data) {
      setVendorData(data.vendor);
    }
  }, [data]);

  const handleUpdate = (field: string, value: string) => {
    if (vendorData) {
      setVendorData((prev) =>
        prev
          ? {
              ...prev,
              [field]: value,
            }
          : null
      );
    }
  };

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit clicked");
    setIsEdit(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!vendorData) {
    return null; // or some loading/error state
  }

  return (
    <div className="container mx-auto flex p-6 justify-between bg-background">
      <Sidebar
        firstName={vendorData?.firstName}
        lastName={vendorData?.lastName}
        avatarUrl={""}
      />

      <main className="container">
        <Card className="max-w-6xl ms-auto">
          <ProfileHeader onEdit={handleEdit} isEdit={isEdit} />
          <ProfileForm
            firstName={vendorData?.firstName}
            lastName={vendorData?.lastName}
            email={vendorData?.email}
            avatarUrl={""}
            contact={vendorData?.phoneNumber!}
            onUpdate={handleUpdate}
            isEdit={isEdit}
          />
        </Card>
      </main>
    </div>
  );
}
