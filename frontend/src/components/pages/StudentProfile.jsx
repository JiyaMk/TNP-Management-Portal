import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentProfile = () => {
  const [semester, setSemester] = useState(0);
  const [sgpa, setSgpa] = useState([]);

  const handleSemesterChange = (e) => {
    const sem = Number(e.target.value);
    setSemester(sem);
    setSgpa(Array(sem).fill(""));
  };

  const handleSgpaChange = (index, value) => {
    const newSgpa = [...sgpa];
    newSgpa[index] = value;
    setSgpa(newSgpa);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <Card className="w-full max-w-2xl p-8 shadow-lg rounded-xl ">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">Student Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Upload User Image</Label>
              <Input type="file" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Roll Number</Label>
              <Input type="text" placeholder="Enter Roll Number" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Branch</Label>
              <Input type="text" placeholder="Enter Branch" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Year</Label>
              <Input type="number" placeholder="Enter Year" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Phone Number</Label>
              <Input type="tel" placeholder="Enter Phone Number" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Semester</Label>
              <Input type="number" placeholder="Enter Semester" className="border border-gray-300 rounded-lg p-2" onChange={handleSemesterChange} />
            </div>
            
            {Array.from({ length: semester }, (_, index) => (
              <div className="grid gap-3" key={index}>
                <Label className="text-lg font-semibold">SGPA for Semester {index + 1}</Label>
                <Input type="number" placeholder={`Enter SGPA for Semester ${index + 1}`} className="border border-gray-300 rounded-lg p-2" value={sgpa[index]} onChange={(e) => handleSgpaChange(index, e.target.value)} />
              </div>
            ))}
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">CGPA Calculation</Label>
              <Input type="text" placeholder="Calculated CGPA" className="border border-gray-300 rounded-lg p-2 bg-gray-100" disabled />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">10th Marks</Label>
              <Input type="number" placeholder="Enter 10th Marks" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">12th Marks</Label>
              <Input type="number" placeholder="Enter 12th Marks" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">College Email</Label>
              <Input type="email" placeholder="Enter College Email" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Personal Email</Label>
              <Input type="email" placeholder="Enter Personal Email" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <div className="grid gap-3">
              <Label className="text-lg font-semibold">Resume Drive Link</Label>
              <Input type="url" placeholder="Enter Resume Drive Link" className="border border-gray-300 rounded-lg p-2" />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;