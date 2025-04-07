import { useState } from "react"; // ⬅️ Import useState
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utils/apiRequest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignupForm({ className, ...props }) {
  const [otpSent, setOtpSent] = useState(false); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await api.post("/auth/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", { email, otp });
      const token = res.data.token;
      localStorage.setItem("registerToken", token);
      toast.success("OTP verified successfully!");
      console.log("JWT token:", token);
      setTimeout(() => {
        navigate("/ProfileForm");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6 w-90 p-4", className)} {...props} onSubmit={handleVerifyOtp}>
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
          <Input id="email" type="email" placeholder="m@example.com" required value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>

        {/* OTP Field */}
        <div className="grid gap-3">
          <Label>OTP</Label>
          {otpSent ? (
            <>
            <Input id="otp" type="text" placeholder="Enter OTP" required value={otp}
            onChange={(e) => setOtp(e.target.value)} />
            <Button
                type="button"
                onClick={handleSendOtp}
              >
                Resend OTP
              </Button>
            </> 
          ) : (
            <Button type="button" onClick={handleSendOtp}>
              Send OTP
            </Button>
          )}
        </div>

        {/* Signup Button */}
        <Button type="submit" className="w-full" disabled={!otpSent || loading}>
          Submit
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
