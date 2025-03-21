import { Outlet } from "react-router-dom";
import { VendorHeader } from "../headers/VendorHeader";
import { Card } from "../ui/card";
import { Sidebar } from "../vendor/Sidebar";
import { useEffect, useState } from "react";
import {
  useVendorJoinCategoryQuery,
  useVendorProfileQuery,
} from "@/hooks/vendor/useVendorProfile";
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
  bio?: string;
  place?: string;
  profileImage?: string;
  totalReviews: number;
  averageRating: number
  __v: number;
  category: {
    _id: string;
    title: string;
  };
}

function VendorLayout() {
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const { data, isLoading } = useVendorProfileQuery();
  const { data: joinCategoryRequestStatus, isLoading: loadingJoinCategory } =
    useVendorJoinCategoryQuery();

  useEffect(() => {
    if (data) {
      setVendorData(data.vendor);
    }
  }, [data]);

  if (isLoading || loadingJoinCategory) {
    return <Spinner />;
  }

  if (!vendorData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorHeader
        firstName={vendorData.firstName}
        lastName={vendorData.lastName}
        email={vendorData.email}
        profileImage={vendorData.profileImage || ""}
      />
      <div className="container mx-auto flex p-6 justify-between bg-background">
        <Sidebar
          firstName={vendorData.firstName}
          lastName={vendorData.lastName}
          profileImage={vendorData.profileImage || ""}
          joinCategoryRequestStatus={joinCategoryRequestStatus?.status}
        />

        <main className="container">
          <Card className="max-w-6xl ms-auto">
            <Outlet
              context={{
                vendorData,
                setVendorData,
                joinCategoryRequestStatus: joinCategoryRequestStatus?.status,
              }}
            />
          </Card>
        </main>
      </div>
    </div>
  );
}

export default VendorLayout;
