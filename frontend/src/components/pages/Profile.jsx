import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getStudentProfile } from "@/utils/apiRequest"; 
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("loginToken");
        console.log(token);
        if (!token) {
          setError("No login token found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await getStudentProfile({
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data.student);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    navigate("/login");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <Card className="w-full max-w-2xl p-8 shadow-lg rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-3xl font-extrabold mt-2 text-[#3c8c84]">
            Student Profile
          </CardTitle>

          <img
            src={profile.profilePic}
            alt="Profile"
            className="h-24 w-24 rounded-full border object-cover mt-4"
          />
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: profile.name },
              { label: "Roll Number", value: profile.rollNumber },
              { label: "Branch", value: profile.branch },
              { label: "Year", value: profile.year },
              { label: "Phone Number", value: profile.phoneNumber },
              { label: "10th Marks (%)", value: profile.marks10th },
              { label: "12th Marks (%)", value: profile.marks12th },
              { label: "Resume Link", value: profile.resumeLink },
              { label: "Backlog", value: profile.backlog},
              { label: "Semester", value: profile.semester },
              { label: "CGPA", value: profile.CGPA },
            ].map(({ label, value }) => (
              <div key={label}>
                <Label>{label}</Label>
                <p className="p-2 border rounded border-[#3c8c84] mt-1 bg-gray-100">
                  {value || "Not Provided"}
                </p>
              </div>
            ))}

            <Button
              className="w-full bg-[#3c8c84] hover:bg-[#3c8c70] text-white font-bold py-3 px-6 rounded-lg mt-4"
              onClick={() => navigate("/StudentProfile")}
            >
              Edit Profile
            </Button>
            <Button
              className="w-full bg-[#3c8c84] hover:bg-[#3c8c70] text-white font-bold py-3 px-6 rounded-lg mt-4"
              onClick={handleLogout}
            >
              Logout
            </Button>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
