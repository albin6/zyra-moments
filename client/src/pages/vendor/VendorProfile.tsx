import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import { ProfileForm } from "@/components/vendor/ProfileForm";
import { ProfileHeader } from "@/components/vendor/ProfileHeader";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Vendor } from "@/components/layouts/VendorLayout";

interface VendorContextType {
  vendorData: Vendor | null;
  setVendorData: React.Dispatch<React.SetStateAction<Vendor | null>>;
}

export default function VendorProfile() {
  const { vendorData, setVendorData } = useOutletContext<VendorContextType>();
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdate = (field: string, value: string) => {
    setVendorData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleEdit = () => {
    console.log("Edit clicked");
    setIsEdit(true);
  };

  if (!vendorData) {
    return null;
  }

  return (
    <>
      <ProfileHeader onEdit={handleEdit} isEdit={isEdit} />
      <ProfileForm
        firstName={vendorData.firstName}
        lastName={vendorData.lastName}
        email={vendorData.email}
        avatarUrl={""}
        contact={vendorData.phoneNumber}
        onUpdate={handleUpdate}
        isEdit={isEdit}
      />
      <ResetPasswordModal />
    </>
  );
}
