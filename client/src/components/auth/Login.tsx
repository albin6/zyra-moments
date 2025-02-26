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
import { loginSchema } from "@/utils/login.validator";

type UserType = "admin" | "client" | "vendor";

interface LoginProps {
  userType: UserType;
  onSubmit: (data: { email: string; password: string }) => void;
  setSignup?: () => void;
}

export function Login({ userType, onSubmit, setSignup }: LoginProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      onSubmit({ email: values.email, password: values.password });
      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    },
  });

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Login as {userType}
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      {userType !== "admin" && (
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span
              onClick={setSignup}
              className="cursor-pointer text-primary hover:underline"
            >
              Sign up
            </span>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
