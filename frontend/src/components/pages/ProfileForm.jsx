import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "@/utils/apiRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    personalMail: "",
    password: "",
    rollNumber: "",
    branch: "",
    year: "",
    phoneNumber: "",
    marks10th: "",
    marks12th: "",
    resumeLink: "",
    certifications: "",
    backlog: "",
    semester: "",
    SGPA: [],
  });

  
  const subBranchOptions = {
    CSE: ["CSE1", "CSE2", "CSE3"],
    ECE: ["ECE1", "ECE2", "ECE3"],
    IT: ["IT1", "IT2"],
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "semester") {
        const count = parseInt(value, 10) || 0;
        updated.SGPA = new Array(count).fill("");
      }
      if (name === "branch") {
        updated.subBranch = ""; 
      }
      return updated;
    });
  };

  const handleSGPAChange = (index, value) => {
    setProfile((prev) => {
      const updatedSGPA = [...prev.SGPA];
      updatedSGPA[index] = value;
      return { ...prev, SGPA: updatedSGPA };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("registerToken");
    if (!token) {
      toast.error("Token not found.");
      return;
    }

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          formData.append(`${key}[${i}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      await api.post("/auth/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Registration successful!");
      navigate("/student-dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <Card className="w-full max-w-2xl p-8 shadow-lg rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-3xl font-extrabold mt-2">
            Enter Profile Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Personal Email", name: "personalMail", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Roll Number", name: "rollNumber", type: "text" },
              //{ label: "Branch", name: "branch", type: "text" },
              { label: "Year", name: "year", type: "number" },
              { label: "Phone Number", name: "phoneNumber", type: "tel" },
              { label: "10th Marks (in percentage)", name: "marks10th", type: "number" },
              { label: "12th Marks (in percentage)", name: "marks12th", type: "number" },
              { label: "Resume Link", name: "resumeLink", type: "url" },
              { label: "Certifications", name: "certifications", type: "text" },
              //{ label: "Backlog (if any)", name: "backlog", type: "text" },
              //{ label: "Semester", name: "semester", type: "number" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label className="mb-2">{label}</Label>
                <Input
                  type={type}
                  name={name}
                  value={profile[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}

            {/* Branch Dropdown */}
            <div>
              <Label>Branch</Label>
              <select
                name="branch"
                value={profile.branch}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option>MAE</option>
                <option value="IT">IT</option>
                <option>CSE-AI</option>
                <option>AI/ML</option>
                <option>ECE-AI</option>
              </select>
            </div>

            {/* Sub-branch Dropdown */}
            {subBranchOptions[profile.branch]?.length > 0 && (
              <div>
                <Label>Sub-Branch</Label>
                <select
                  name="subBranch"
                  value={profile.subBranch}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="">Select Sub-Branch</option>
                  {subBranchOptions[profile.branch].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Backlog Dropdown */}
            <div>
              <Label>Backlog (if any)</Label>
              <select
                name="backlog"
                value={profile.backlog}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* No. of Semester Field display */}
            <div>
              <Label>Semester</Label>
              <Input
                type="number"
                name="semester"
                value={profile.semester}
                onChange={handleChange}
                placeholder="Enter semester"
                className="mt-1"
              />
            </div>


            {profile.SGPA.length > 0 && (
              <div>
                <Label>SGPA</Label>
                {profile.SGPA.map((value, index) => (
                  <div key={index} className="mt-2">
                    <Label className="mb-2">SGPA {index + 1}</Label>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleSGPAChange(index, e.target.value)
                      }
                      placeholder={`SGPA for semester ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <Label>Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#3c8c84] hover:bg-[#3c8c84]/90 text-white font-bold py-3 px-6 rounded-lg"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
