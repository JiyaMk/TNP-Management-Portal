import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(true); // First-time user starts in edit mode
  const [profile, setProfile] = useState({
    fullName: "",
    image: "",
    rollNumber: "",
    branch: "",
    year: "",
    phone: "",
    semester: "",
    sgpa: [],
    tenthMarks: "",
    twelfthMarks: "",
    collegeEmail: "",
    personalEmail: "",
    resumeLink: "",
  });

  // Load profile from Local Storage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("studentProfile"));
    if (savedProfile) {
      setProfile(savedProfile);
      setIsEditing(false); // If profile exists, start in view mode
    }
  }, []);

  // Save to Local Storage when profile changes
  useEffect(() => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
  }, [profile]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: value };

      // If updating semester, reset SGPA fields
      if (name === "semester") {
        const semesterCount = parseInt(value, 10) || 0;
        updatedProfile.sgpa = new Array(semesterCount).fill("");
      }

      return updatedProfile;
    });
  };

  // Handle SGPA Change
  const handleSGPAChange = (index, value) => {
    setProfile((prev) => {
      const updatedSGPA = [...prev.sgpa];
      updatedSGPA[index] = value;
      return { ...prev, sgpa: updatedSGPA };
    });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <Card className="w-full max-w-2xl p-8 shadow-lg rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-3xl font-extrabold mt-2">
            Student Profile
          </CardTitle>

          {/* Profile Image Upload */}
          <label htmlFor="profileImage" className="cursor-pointer mt-4">
            <img
              src={profile.image || "https://via.placeholder.com/100"}
              alt="Profile"
              className="h-24 w-24 rounded-full border object-cover"
            />
          </label>
          {isEditing && (
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
          )}
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Roll Number", name: "rollNumber", type: "text" },
              { label: "Branch", name: "branch", type: "text" },
              { label: "Year", name: "year", type: "number" },
              { label: "Phone Number", name: "phone", type: "tel" },
              { label: "10th Marks", name: "tenthMarks", type: "number" },
              { label: "12th Marks", name: "twelfthMarks", type: "number" },
              { label: "Resume Link", name: "resumeLink", type: "url" },
              { label: "Semester", name: "semester", type: "number" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label>{label}</Label>
                {isEditing ? (
                  <Input
                    type={type}
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <p className="p-2 border rounded">{profile[name] || `Enter ${label.toLowerCase()}`}</p>
                )}
              </div>
            ))}

            {/* SGPA Fields (Dynamically Generated) */}
            {profile.sgpa.length > 0 && (
              <div>
                <Label>SGPA</Label>
                {profile.sgpa.map((sgpaValue, index) => (
                  <div key={index} className="flex flex-col mt-2">
                    <Label>SGPA {index + 1}</Label>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={sgpaValue}
                        onChange={(e) => handleSGPAChange(index, e.target.value)}
                        placeholder={`Enter SGPA for semester ${index + 1}`}
                      />
                    ) : (
                      <p className="p-2 border rounded">{sgpaValue || `Enter SGPA for semester ${index + 1}`}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Save or Edit Profile Button */}
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(!isEditing); // Toggle edit mode
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
