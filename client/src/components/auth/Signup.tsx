import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { signupSchema } from "@/utils/signup.validator";
import { User } from "@/types/User";
import OTPModal from "../modals/OTPModal";
import { useState } from "react";

type UserType = "admin" | "client" | "vendor";

interface SignupProps {
  userType: UserType;
  onSubmit: (data: User) => void;
  setLogin?: () => void;
}

export function Signup({ userType, onSubmit, setLogin }: SignupProps) {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [userData, setUserData] = useState<User>();

  const handleOpenOTPModal = () => {
    setIsOTPModalOpen(true);
  };

  const handleCloseOTPModal = () => {
    setIsOTPModalOpen(false);
  };

  const handleVerifyOTP = (otp: string) => {
    console.log("Verifying OTP:", otp);
    // Implement your OTP verification logic here
    // If verification is successful, close the modal
    setIsOTPModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, actions) => {
      setUserData(() => values);
      handleOpenOTPModal();
      onSubmit(values);
      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
        },
      });
    },
  });

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign up as {userType}
        </CardTitle>
        <CardDescription className="text-center">
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="space-y-2 flex-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-sm text-red-500">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-sm text-red-500">{formik.errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Contact Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your contact number"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={setLogin}
            className="cursor-pointer text-primary hover:underline"
          >
            Log in
          </span>
        </p>
      </CardFooter>
      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={handleCloseOTPModal}
        onVerify={handleVerifyOTP}
      />
    </Card>
  );
}
