"use client";

import { useState } from "react";
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store, ShoppingBag, UserPlus, LogIn } from "lucide-react";

export function VendorAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (data: any) => {
    console.log(data);
    // Handle authentication logic here
  };

  return (
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
                <Login userType="vendor" onSubmit={handleSubmit} />
              ) : (
                <Signup userType="vendor" onSubmit={handleSubmit} />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
