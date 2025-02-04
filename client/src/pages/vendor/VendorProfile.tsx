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
  status: string; // Change to boolean if it's meant to be true/false
  createdAt: string;
  updatedAt: string;
  __v: number;
  category: string;
}

export default function VendorProfile() {
  // // You would typically fetch this data from your backend
  // const vendorData = {
  //   name: "Vendor Name",
  //   email: "vendor@email.com",
  //   avatarUrl: "",
  // };

  const { data, isLoading } = useVendorProfileQuery();

  const [vendorData, setVendorData] = useState<Vendor>();

  useEffect(() => {
    if (data) {
      setVendorData(data.vendor);
    }
  }, [data]);

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit clicked");
  };

  if (isLoading) {
    return (
      <div className="max-w-full flex justify-center pt-14">
        <Spinner />;
      </div>
    );
  }

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
