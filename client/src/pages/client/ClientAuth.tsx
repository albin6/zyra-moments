import { useState } from "react";
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ClientAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (data: any) => {
    console.log(data);
    // Handle authentication logic here
  };

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-lg">
        <div className="md:w-1/2 bg-gradient-to-br from-primary to-primary-foreground p-6 text-primary-foreground flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-center mb-6">We're so excited to see you again!</p>
          <img
            src="/placeholder.svg?height=200&width=200&text=Auth"
            alt="Authentication illustration"
            className="w-48 h-48 object-cover rounded-full bg-white"
          />
        </div>
        <div className="md:w-1/2 p-6 bg-card text-card-foreground">
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
          {isLogin ? (
            <Login userType="client" onSubmit={handleSubmit} />
          ) : (
            <Signup userType="client" onSubmit={handleSubmit} />
          )}
        </div>
      </Card>
    </div>
  );
}
