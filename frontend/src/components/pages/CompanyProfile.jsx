import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./CompanyProfile.css"; // Import the CSS file

const CompanyProfile = () => {
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
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Role</Label>
              <Input
                type="text"
                id="role"
                placeholder="Enter Role"
                className="company-input"
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Stipend</Label>
              <Input
                type="number"
                id="stipend"
                placeholder="Enter Stipend (if any)"
                className="company-input"
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Enter Location"
                className="company-input"
              />
            </div>

            <div className="company-input-group">
              <Label className="company-label">Last Date for Database Submission</Label>
              <Input
                type="date"
                id="submission-date"
                className="company-input"
              />
            </div>

            <Button type="submit" className="company-submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
