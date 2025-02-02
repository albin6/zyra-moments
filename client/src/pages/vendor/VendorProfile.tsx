import { Card } from "@/components/ui/card";
import { ProfileForm } from "@/components/vendor/ProfileForm";
import { ProfileHeader } from "@/components/vendor/ProfileHeader";
import { Sidebar } from "@/components/vendor/Sidebar";

export default function VendorProfile() {
  // You would typically fetch this data from your backend
  const vendorData = {
    name: "Vendor Name",
    email: "vendor@email.com",
    avatarUrl: "",
  };

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit clicked");
  };

  return (
    <div className="container mx-auto flex p-6 justify-between bg-background">
      <Sidebar vendorName={vendorData.name} avatarUrl={vendorData.avatarUrl} />

      <main className="container">
        <Card className="max-w-6xl ms-auto">
          <ProfileHeader onEdit={handleEdit} />
          <ProfileForm
            vendorName={vendorData.name}
            email={vendorData.email}
            avatarUrl={vendorData.avatarUrl}
          />
        </Card>
      </main>
    </div>
  );
}
