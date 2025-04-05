import { SignupForm } from "../ui/signup-form"; // Ensure correct import

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
        <img
          src="image.png"
          alt="Signup Illustration"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-2">
        <SignupForm />
      </div>
    </div>
  );
}
