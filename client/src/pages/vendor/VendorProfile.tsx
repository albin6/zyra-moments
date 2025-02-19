import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import { ProfileForm } from "@/components/vendor/ProfileForm";
import { ProfileHeader } from "@/components/vendor/ProfileHeader";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Vendor } from "@/components/layouts/VendorLayout";
import { Button } from "@/components/ui/button";
import { useVendorProfileMutation } from "@/hooks/vendor/useVendorProfile";
import { toast } from "sonner";

interface VendorContextType {
  vendorData: Vendor | null;
  setVendorData: React.Dispatch<React.SetStateAction<Vendor | null>>;
  joinCategoryRequestStatus: string | undefined;
}

export interface UpdateVendorData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage: string;
  bio: string;
  place: string;
}

export default function VendorProfile() {
  const { vendorData, setVendorData, joinCategoryRequestStatus } =
    useOutletContext<VendorContextType>();
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: updateVendorProfile } = useVendorProfileMutation();

  const handleUpdateVendorProfile = () => {
    if (vendorData) {
      updateVendorProfile(
        {
          firstName: vendorData?.firstName,
          lastName: vendorData?.lastName,
          phoneNumber: vendorData?.phoneNumber,
          bio: vendorData.bio || "",
          place: vendorData.place || "",
          profileImage: vendorData.profileImage || "",
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            setIsEdit(false);
          },
          onError: (error: any) => toast.error(error.response.data.message),
        }
      );
    }
  };

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
      <ProfileHeader
        onEdit={handleEdit}
        isEdit={isEdit}
        joinCategoryRequestStatus={joinCategoryRequestStatus}
      />
      <ProfileForm
        firstName={vendorData.firstName}
        lastName={vendorData.lastName}
        email={vendorData.email}
        bio={vendorData.bio!}
        place={vendorData.place!}
        profileImage={vendorData.profileImage || ""}
        phoneNumber={vendorData.phoneNumber}
        onUpdate={handleUpdate}
        isEdit={isEdit}
      />
      <div className="flex justify-end">
        <ResetPasswordModal />
        {isEdit && (
          <Button
            variant="outline"
            onClick={handleUpdateVendorProfile}
            className="mb-6 mr-6"
          >
            Update
          </Button>
        )}
      </div>
    </>
  );
}
