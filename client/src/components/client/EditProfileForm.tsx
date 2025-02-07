import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clientProfileSchema } from "@/utils/profile.validator";
import { useFormik } from "formik";
import ResetPasswordModal from "../modals/ResetPasswordModal";

interface EditProfileFormProps {
  setIsEditing: (isEditing: boolean) => void;
}

export function EditProfileForm({ setIsEditing }: EditProfileFormProps) {
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: clientProfileSchema,
    onSubmit: (values) => {
      setIsEditing(false);
      console.log(values);
    },
  });

  const handlePasswordReset = () => {};

  return (
    <>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...formik.getFieldProps("firstName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...formik.getFieldProps("lastName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...formik.getFieldProps("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              {...formik.getFieldProps("phoneNumber")}
            />
          </div>
        </div>

        <ResetPasswordModal />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </>
  );
}
