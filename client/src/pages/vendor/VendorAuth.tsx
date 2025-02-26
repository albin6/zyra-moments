import { useState } from "react";
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store, ShoppingBag, UserPlus, LogIn } from "lucide-react";
import { User } from "@/types/User";
import { useRegisterMutation } from "@/hooks/auth/useRegister";
import { useLoginMutation } from "@/hooks/auth/useLogin";
import { ILoginData } from "@/services/auth/authService";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { vendorLogin } from "@/store/slices/vendorSlice";
import { motion } from "framer-motion";
import { useGoogleMutation } from "@/hooks/auth/useGoogle";
import { CredentialResponse } from "@react-oauth/google";
import GoogleAuth from "@/components/auth/GoogleAuth";

export function VendorAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const { mutate: registerClient } = useRegisterMutation();
  const { mutate: loginClient } = useLoginMutation();
  const { mutate: googleLogin } = useGoogleMutation();

  const google = (credentialResponse: CredentialResponse) => {
    googleLogin(
      {
        credential: credentialResponse.credential,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        role: "vendor",
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(vendorLogin(data.user));
        },
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const handleSignupSubmit = (data: Omit<User, "role">) => {
    registerClient(
      { ...data, role: "vendor" },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
    setIsLogin(true);
  };

  const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
    loginClient(
      { ...data, role: "vendor" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(vendorLogin(data.user));
        },
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  return (
    <motion.div
      key={isLogin ? "login" : "signup"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 flex items-center justify-center">
        <Card className="w-full max-w-5xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 bg-primary/10 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm" />
              <div className="relative z-10 text-center">
                <Store className="w-24 h-24 mb-6 mx-auto text-primary" />
                <h2 className="text-3xl font-bold mb-4 text-primary">
                  Vendor Portal
                </h2>
                <p className="text-muted-foreground mb-6">
                  Manage your products and sales with ease
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant={isLogin ? "default" : "outline"}
                    onClick={() => setIsLogin(true)}
                    className="w-32"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                  <Button
                    variant={!isLogin ? "default" : "outline"}
                    onClick={() => setIsLogin(false)}
                    className="w-32"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </div>
              </div>
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl" />
            </div>
            <div className="lg:w-1/2 p-8 bg-card">
              <div className="max-w-md mx-auto">
                <div className="mb-6 text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <h3 className="text-2xl font-semibold">
                    {isLogin ? "Welcome Back!" : "Join Our Vendor Network"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isLogin
                      ? "Access your vendor dashboard"
                      : "Start selling your products today"}
                  </p>
                </div>
                {isLogin ? (
                  <Login
                    userType="vendor"
                    onSubmit={handleLoginSubmit}
                    setSignup={() => setIsLogin(false)}
                  />
                ) : (
                  <Signup
                    userType="vendor"
                    onSubmit={handleSignupSubmit}
                    setLogin={() => setIsLogin(true)}
                  />
                )}
              </div>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  {/* <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("google")}
                  >
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("github")}
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </Button> */}
                  <GoogleAuth handleGoogleSuccess={google} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
