import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-[120px] font-extrabold text-[#3c8c84] leading-none">401</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Unauthorized Access</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        You don’t have the necessary permissions to view this page. Please login with a proper role or contact your administrator.
      </p>
      <Button onClick={() => navigate("/login")} className="bg-[#3c8c84] text-white px-6 py-3 rounded-xl">
        Go to Login
      </Button>
    </div>
  );
};

export {Unauthorized};

  