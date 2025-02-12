import { Outlet } from "react-router-dom";
import { VendorHeader } from "../headers/VendorHeader";
import { Card } from "../ui/card";
import { Sidebar } from "../vendor/Sidebar";
import { useEffect, useState } from "react";
import { useVendorProfileQuery } from "@/hooks/vendor/useVendorProfile";
import { Spinner } from "../ui/spinner";

export interface Vendor {
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

function VendorLayout() {
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const { data, isLoading } = useVendorProfileQuery();

  useEffect(() => {
    if (data) {
      setVendorData(data.vendor);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!vendorData) {
    return null; // Handle loading/error state
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorHeader />
      <div className="container mx-auto flex p-6 justify-between bg-background">
        <Sidebar
          firstName={vendorData.firstName}
          lastName={vendorData.lastName}
          avatarUrl={""}
        />

        <main className="container">
          <Card className="max-w-6xl ms-auto">
            <Outlet context={{ vendorData, setVendorData }} />
          </Card>
        </main>
      </div>
    </div>
  );
}

export default VendorLayout;
