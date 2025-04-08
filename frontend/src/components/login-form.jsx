import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utils/apiRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("loginToken", token);
      // console.log("JWT token:", token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Role Selection */}
      <div className="grid gap-3">
          <Label htmlFor="role">Select your role</Label>
          <select
            id="role"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled selected>
              Choose your role
            </option>
            <option value="student">Faculty</option>
            <option value="management">Student</option>
          </select>
        </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>

        

        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/SignUp" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
