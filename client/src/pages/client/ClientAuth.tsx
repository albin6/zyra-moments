import { useState } from "react";
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthCarousel } from "@/components/carousel/AuthCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { useRegisterMutation } from "@/hooks/auth/useRegister";
import { toast } from "sonner";
import { User } from "@/types/User";
import { useLoginMutation } from "@/hooks/auth/useLogin";
import { ILoginData } from "@/services/auth/authService";
import { useDispatch } from "react-redux";
import { clientLogin } from "@/store/slices/clientSlice";
import { useTheme } from "@/context/ThemeProvider";
import { ClientHeader } from "@/components/headers/ClientHeader";
import { CredentialResponse } from "@react-oauth/google";
import { useGoogleMutation } from "@/hooks/auth/useGoogle";
import GoogleAuth from "@/components/auth/GoogleAuth";

export function ClientAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const { theme } = useTheme();

  const { mutate: registerClient } = useRegisterMutation();
  const { mutate: loginClient } = useLoginMutation();
  const { mutate: googleLogin } = useGoogleMutation();

  const google = (credentialResponse: CredentialResponse) => {
    googleLogin(
      {
        credential: credentialResponse.credential,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        role: "client",
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(clientLogin(data.user));
        },
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const handleSignupSubmit = (data: Omit<User, "role">) => {
    registerClient(
      { ...data, role: "client" },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
    setIsLogin(true);
  };

  const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
    loginClient(
      { ...data, role: "client" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(clientLogin(data.user));
        },
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  // const handleSocialLogin = (provider: string) => {
  //   console.log(`Logging in with ${provider}`);
  // };

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      <motion.div
        key={isLogin ? "login" : "signup"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-7xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
            <div className="md:w-1/2 bg-primary overflow-hidden h-[300px] md:h-auto relative">
              <AuthCarousel />
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Welcome Back
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    We're glad to see you again!
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8 bg-card text-card-foreground">
              <div className="flex justify-center mb-6">
                <img
                  src={
                    theme == "light"
                      ? "https://res.cloudinary.com/dkgic4cru/image/upload/v1738128302/logo-no-background_rfsdcg.svg"
                      : "https://res.cloudinary.com/dkgic4cru/image/upload/v1738322014/logo-no-background_nxa5qx.svg"
                  }
                  alt="Logo"
                  className="h-12 fill-current dark:text-white"
                />
              </div>
              <div className="flex mb-6">
                <Button
                  variant={isLogin ? "default" : "outline"}
                  className="flex-1 rounded-r-none"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? "default" : "outline"}
                  className="flex-1 rounded-l-none"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {isLogin ? (
                    <Login
                      userType="client"
                      onSubmit={handleLoginSubmit}
                      setSignup={() => setIsLogin(false)}
                    />
                  ) : (
                    <Signup
                      userType="client"
                      onSubmit={handleSignupSubmit}
                      setLogin={() => setIsLogin(true)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
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
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
