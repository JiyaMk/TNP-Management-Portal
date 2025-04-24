import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/apiRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    stipend: "",
    location: "",
    lastDate: "",
  });
  const navigate = useNavigate();
  
  useEffect(() => {
      const role = localStorage.getItem("role");
      if (role !== "pr_head") {
        navigate("/unauthorized"); 
      }
    }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/company/register", formData);
      toast.success("Company Profile added successfully!");
      setTimeout(() => navigate("/student-dashboard"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add company profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <Card className="w-full max-w-lg shadow-lg p-8  rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold ">Company Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <Label className="capitalize font-semibold  mb-1">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Input
                  type={key === "lastDate" ? "date" : key === "stipend" ? "number" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  required={key !== "stipend"}
                  className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2"
                />
              </div>
            ))}
            <Button 
              type="submit" 
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;