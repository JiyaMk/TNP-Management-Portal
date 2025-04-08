import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./CompanyProfile.css"; // Import the CSS file
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/apiRequest";

const CompanyProfile = () => {
  const [name, setCompanyName] = useState("");
  const [role, setRole] = useState(""); 
  const [stipend, setStipend] = useState("");
  const [location, setLocation] = useState("");
  const [lastDate, setLastDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/company/register", { name, role, stipend, location, lastDate,});
      toast.success("Company Profile added successfully!");
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add company profile");
    }
  }
  return (
    <div className="company-form-container">
      <Card className="company-card">
        <CardHeader>
          <CardTitle className="company-title">Company Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="company-form">
            <div className="company-input-group">
              <Label className="company-label">Company Name</Label>
              <Input
                type="text"
                id="company-name"
                placeholder="Enter Company Name"
                className="company-input"
                required
                value={name}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Role</Label>
              <Input
                type="text"
                id="role"
                placeholder="Enter Role"
                className="company-input"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Stipend</Label>
              <Input
                type="number"
                id="stipend"
                placeholder="Enter Stipend (if any)"
                className="company-input"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Enter Location"
                className="company-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Last Date for Database Submission</Label>
              <Input
                type="date"
                id="submission-date"
                className="company-input"
                required
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
              />
            </div>

            <Button type="submit" className="company-submit" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
