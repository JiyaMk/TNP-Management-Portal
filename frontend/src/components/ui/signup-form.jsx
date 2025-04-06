import { useState } from "react"; // ⬅️ Import useState
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({ className, ...props }) {
  const [otpSent, setOtpSent] = useState(false); // ⬅️ OTP state

  const handleSendOtp = () => {
    // Add logic to send OTP (e.g., API call)
    setOtpSent(true);
  };

  return (
    <form className={cn("flex flex-col gap-6 w-90 p-4", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm">
          Sign up to get started
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Field */}
        <div className="grid gap-3">
          <Label htmlFor="email">College Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        {/* OTP Field */}
        <div className="grid gap-3">
          <Label>OTP</Label>
          {otpSent ? (
            <Input id="otp" type="text" placeholder="Enter OTP" required />
          ) : (
            <Button type="button" onClick={handleSendOtp}>
              Send OTP
            </Button>
          )}
        </div>

        {/* Signup Button */}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
