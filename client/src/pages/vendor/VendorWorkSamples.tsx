import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Sidebar } from "@/components/vendor/Sidebar";
import { WorkSampleList } from "@/components/vendor/WorkSampleList";
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

export default function VendorWorkSamples() {
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
          <WorkSampleList
            items={[]}
            onView={(id: any) => {}}
            isLoading={true}
          />
        </Card>
      </main>
    </div>
  );
}
