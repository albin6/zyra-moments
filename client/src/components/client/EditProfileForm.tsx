import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { clientProfileSchema } from "@/utils/profile.validator";
import { uploadToCloudinary } from "@/utils/upload-cloudinary/cloudinary";

interface Client {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
}

interface EditProfileFormProps {
  setIsEditing: (isEditing: boolean) => void;
  data: Client;
  handleUpdateClientProfile: (values: Client) => void;
}

export function EditProfileForm({
  data,
  setIsEditing,
  handleUpdateClientProfile,
}: EditProfileFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      profileImage: data.profileImage || "",
    },
    validationSchema: clientProfileSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        handleUpdateClientProfile(values);
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update profile");
        console.error("Failed to update profile:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const secureUrl = await uploadToCloudinary(file);
        formik.setFieldValue("profileImage", secureUrl);
      } catch (error) {
        toast.error("Failed to upload image");
        console.error("Failed to upload image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        <Label>Profile Picture</Label>
        <div className="flex items-center space-x-4">
          {formik.values.profileImage && (
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={formik.values.profileImage}
                alt={formik.values.firstName}
              />
              <AvatarFallback className="bg-primary/10">
                {formik.values.firstName.charAt(0) +
                  formik.values.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col space-y-2">
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              disabled={isUploading}
              className="w-full"
            />
            {isUploading && (
              <p className="text-sm text-muted-foreground">Uploading...</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...formik.getFieldProps("firstName")}
            className={
              formik.errors.firstName && formik.touched.firstName
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-sm text-red-500">{formik.errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...formik.getFieldProps("lastName")}
            className={
              formik.errors.lastName && formik.touched.lastName
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-sm text-red-500">{formik.errors.lastName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            className={
              formik.errors.email && formik.touched.email
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            {...formik.getFieldProps("phoneNumber")}
            className={
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-sm text-red-500">{formik.errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsEditing(false)}
          disabled={formik.isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={formik.isSubmitting || isUploading || !formik.isValid}
        >
          {formik.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
