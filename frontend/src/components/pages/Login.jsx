import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { LoginForm } from "../login-form";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
        <img
          src="img4.png"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <LoginForm/>
      </div>
    </div>
  );
}

