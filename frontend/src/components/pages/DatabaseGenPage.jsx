import React, { useState } from "react";
import { FaFilter, FaList } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const fields = [
  "Name", "Roll No", "10th Marks", "12th Marks", "Backlogs", "Phone Number",
  "Year", "Semester", "Branch", "CGPA", "Certifications"
];

const branches = ["CSE", "ECE", "IT", "ECE-AI", "AI-ML", "MECH", "CIVIL"];

const certificationsList = [
  "Certified in Python Development", "Completed Web Dev Bootcamp",
  "AI-ML Internship Certification", "Certified Ethical Hacker",
  "AWS Cloud Practitioner", "Full Stack Development Bootcamp",
  "Google Cybersecurity Certification", "Blockchain Essentials Certified",
  "Microsoft Azure Fundamentals", "Data Science Professional Certificate"
];

const demoStudents = Array.from({ length: 20 }, (_, i) => {
  const sgpas = Array.from({ length: 8 }, () => (Math.random() * 4 + 6).toFixed(2));
  const cgpa = (sgpas.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / sgpas.length).toFixed(2);
  return {
    Name: `Student ${i + 1}`,
    "Roll No": `ROLL${1000 + i}`,
    "10th Marks": Math.floor(Math.random() * 40) + 60,
    "12th Marks": Math.floor(Math.random() * 40) + 60,
    Backlogs: Math.floor(Math.random() * 5),
    "Phone Number": `98765432${String(i).padStart(2, "0")}`,
    Year: Math.ceil((i + 1) / 5),
    Semester: ((i % 8) + 1),
    Branch: branches[Math.floor(Math.random() * branches.length)],
    CGPA: parseFloat(cgpa),
    Certifications: certificationsList[Math.floor(Math.random() * certificationsList.length)]
  };
});

const DatabasePage = () => {
  const [visibleFields, setVisibleFields] = useState(fields);
  const [students] = useState(demoStudents);
  const [filters, setFilters] = useState({ tenth: 0, twelfth: 0, cgpa: 0, backlog: "all", branch: "all" });

  const toggleField = (field) => {
    setVisibleFields((prev) => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  const toggleAllFields = () => {
    setVisibleFields(visibleFields.length === fields.length ? [] : fields);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredStudents = students.filter(student =>
    student["10th Marks"] >= filters.tenth &&
    student["12th Marks"] >= filters.twelfth &&
    student.CGPA >= filters.cgpa &&
    (filters.backlog === "all" || (filters.backlog === "0" ? student.Backlogs === 0 : student.Backlogs > 0)) &&
    (filters.branch === "all" || student.Branch === filters.branch)
  );

  return (
    <div className="flex flex-col p-6 h-screen">
      <div className="flex gap-4 mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FaList className="text-xl" /> Fields
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Select Fields</h2>
            <Button className="w-full mb-3 bg-blue-500" onClick={toggleAllFields}>
              {visibleFields.length === fields.length ? "Deselect All" : "Select All"}
            </Button>
            <div className="max-h-[100vh] overflow-y-auto">
              {fields.map((field) => (
                <label key={field} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" checked={visibleFields.includes(field)} onChange={() => toggleField(field)} className="mr-2" />
                  {field}
                </label>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FaFilter className="text-xl" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-3">
              <input type="number" name="tenth" placeholder="10th Marks" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange} />
              <input type="number" name="twelfth" placeholder="12th Marks" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange} />
              <input type="number" step="0.1" name="cgpa" placeholder="CGPA" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange} />
              <select name="backlog" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="0">No Backlogs</option>
                <option value="1">With Backlogs</option>
              </select>
              <select name="branch" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange}>
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 overflow-auto p-4 shadow rounded-lg">
        <table className="w-full border text-sm">
          <thead className="bg-gray-500">
            <tr>
              {visibleFields.map((field) => (
                <th key={field} className="border px-4 py-2 text-left">{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                {visibleFields.map((field) => (
                  <td key={field} className="border px-4 py-2">
                    {field === "Certifications" ? (
                      <span className="block max-w-xs truncate">{student[field]}</span>
                    ) : (
                      student[field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-500">Send DB</Button>
      </div>
    </div>
  );
};

export default DatabasePage;
