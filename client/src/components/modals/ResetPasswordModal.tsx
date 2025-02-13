import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useClientPasswordUpdateMutation } from "@/hooks/client/useClientPassword";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useVendorPasswordUpdateMutation } from "@/hooks/vendor/useVendorPassword";

const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm new password is required"),
});

export default function ResetPasswordModal() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { mutate: updateClientPassword } = useClientPasswordUpdateMutation();
  const { mutate: updateVendorPassword } = useVendorPasswordUpdateMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: PasswordChangeSchema,
    onSubmit: (values) => {
      console.log(location.pathname);

      location.pathname.startsWith("/profile")
        ? updateClientPassword(
            {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            },
            {
              onSuccess: (data) => {
                toast.success(data.message);
                setOpen(false);
              },
              onError: (error: any) => toast.error(error.response.data.message),
            }
          )
        : updateVendorPassword(
            {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            },
            {
              onSuccess: (data) => {
                toast.success(data.message);
                setOpen(false);
              },
              onError: (error: any) => toast.error(error.response.data.message),
            }
          );
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-6 mr-6">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Change Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...formik.getFieldProps("currentPassword")}
              className={
                formik.errors.currentPassword && formik.touched.currentPassword
                  ? "border-destructive"
                  : ""
              }
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {formik.errors.currentPassword}
                </p>
              )}
            {/* {formik.errors.currentPassword &&
              formik.touched.currentPassword && (
                <Alert variant="destructive" className="py-1">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {formik.errors.currentPassword}
                  </AlertDescription>
                </Alert>
              )} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...formik.getFieldProps("newPassword")}
              className={
                formik.errors.newPassword && formik.touched.newPassword
                  ? "border-destructive"
                  : ""
              }
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm text-red-500">
                {formik.errors.newPassword}
              </p>
            )}
            {/* {formik.errors.newPassword && formik.touched.newPassword && (
              <Alert variant="destructive" className="py-1">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formik.errors.newPassword}</AlertDescription>
              </Alert>
            )} */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              {...formik.getFieldProps("confirmNewPassword")}
              className={
                formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword
                  ? "border-destructive"
                  : ""
              }
            />
            {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword && (
                <p className="text-sm text-red-500">
                  {formik.errors.confirmNewPassword}
                </p>
              )}
            {/* {formik.errors.confirmNewPassword &&
              formik.touched.confirmNewPassword && (
                <Alert variant="destructive" className="py-1">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {formik.errors.confirmNewPassword}
                  </AlertDescription>
                </Alert>
              )} */}
          </div>
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
