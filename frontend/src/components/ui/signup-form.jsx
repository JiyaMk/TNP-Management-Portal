import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({ className, ...props }) {
  return (
    <form className={cn("flex flex-col gap-6 w-90 p-4", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm">
          Sign up to get started
        </p>
      </div>
      <div className="grid gap-6">
        {/* Name Field */}
        <div className="grid gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="John Doe" required />
        </div>

        {/* Email Field */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
         {/* Role Selection */}
        <div className="grid gap-3">
          <Label htmlFor="role">Select your role</Label>
          <select
            id="role"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="" disabled selected>
              Choose your role
            </option>
            <option value="student">Student</option>
            <option value="management">Management Head</option>
            <option value="pr">PR Head</option>
          </select>
        </div>
        {/* Password Field */}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>

        {/* Confirm Password Field */}
        <div className="grid gap-3">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" required />
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
